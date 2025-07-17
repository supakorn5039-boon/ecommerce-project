import ButtonCustom from '@/components/button/ButtonCustom';
import { SpinnerLoadingPulse } from '@/components/loading/SpinLoading';
import Modal from '@/components/utils/Modal';
import SearchBox from '@/components/utils/SearchBox';
import { ProductCategoryName } from '@/constants/ProductConst';
import { ROUTES } from '@/constants/RouteConst';
import { ProductDefaultValue } from '@/dto/ProductDTO';
import { ProductService } from '@/services/Product.service';
import { useUserStore } from '@/store/features/user/useUserStore';
import { ProductFormProps, ProductsApiResponseProps, type ProductParams } from '@/types/Products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ShopForm from './form/ShopForm';

export default function ShopIndex(): React.ReactElement {
  const [filter, setFilter] = useState<ProductParams>({ search: '' });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const form = ProductService.useProductForm(ProductDefaultValue);
  const queryClient = useQueryClient();

  const { role } = useUserStore();
  const navigate = useNavigate();

  const { data: products, isLoading } = useQuery<ProductsApiResponseProps[]>({
    queryKey: [ProductService.QUERY_KEY, filter.search ?? ''],
    queryFn: () => ProductService.getAllProducts({ search: filter.search ?? '' }),
  });

  const mutation = useMutation({
    mutationFn: ProductService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductService.QUERY_KEY] });
      setOpenModal(false);
      form.reset();
    },
  });

  const onSubmit = (data: ProductFormProps) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className={`flex items-center justify-between`}>
        <h1 className="text-3xl font-bold text-center">Our Coffee Shop Menu</h1>
        {role === 'admin' && (
          <div className={`flex justify-end`}>
            <ButtonCustom label="Create Product" className="bg-black" onClick={() => setOpenModal(true)} />
          </div>
        )}
      </div>

      <div className="my-8 flex justify-center">
        <SearchBox
          size="max-w-xl"
          handleSearch={(e: React.ChangeEvent<HTMLInputElement>) => setFilter({ search: e.target.value })}
          searchQuery={filter.search ?? ''}
        />
      </div>

      {isLoading ? (
        <SpinnerLoadingPulse />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`${ROUTES.SHOP}/${product.id}`)}
              className="border cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg">{product.price} ฿</span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                      product.category === 1 ? 'bg-yellow-300 text-yellow-900' : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {product.category ? ProductCategoryName[product.category] : null}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={openModal} onClose={setOpenModal} title="Create Product" className="bg-white">
        <FormProvider {...form}>
          <ShopForm onSubmit={onSubmit} />
        </FormProvider>
      </Modal>
    </div>
  );
}
