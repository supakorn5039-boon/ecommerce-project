import ButtonCustom from '@/components/button/ButtonCustom';
import { SpinnerLoadingPulse } from '@/components/loading/SpinLoading';
import Modal from '@/components/utils/Modal';
import SearchBox from '@/components/utils/SearchBox';
import { ProductCategoryName } from '@/constants/ProductConst';
import { ROUTES } from '@/constants/RouteConst';
import { ProductDefaultValue } from '@/dto/ProductDTO';
import { ProductService } from '@/services/Product.service';
import { useUserStore } from '@/store/features/user/useUserStore';
import type { ProductFormProps, ProductParams, ProductsApiResponseProps } from '@/types/Products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ShopForm from './form/ShopForm';

export default function ShopIndex(): React.ReactElement {
  const [filter, setFilter] = useState<ProductParams>({ search: '' });
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductsApiResponseProps | null>(null);

  const form = ProductService.useProductForm(ProductDefaultValue);

  const queryClient = useQueryClient();
  const { role } = useUserStore();
  const navigate = useNavigate();

  const { data: products, isLoading } = useQuery<ProductsApiResponseProps[]>({
    queryKey: [ProductService.QUERY_KEY, filter.search],
    queryFn: () => ProductService.getAllProducts({ search: filter.search }),
  });

  const mutation = useMutation({
    mutationFn: (data: ProductFormProps) => {
      if (selectedProduct) {
        return ProductService.updateProduct(selectedProduct.id, data);
      }
      return ProductService.createProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductService.QUERY_KEY] });
      setOpenModal(false);
      setTimeout(() => {
        form.reset(ProductDefaultValue);
        setSelectedProduct(null);
      }, 300);
    },
  });

  const onSubmit = useCallback(
    (data: ProductFormProps) => {
      mutation.mutate(data);
    },
    [mutation],
  );

  const openFormModal = useCallback(
    (product?: ProductsApiResponseProps) => {
      setSelectedProduct(product ?? null);
      form.reset(product ?? ProductDefaultValue);
      setOpenModal(true);
    },
    [form],
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ search: e.target.value });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-center">Our Coffee Shop Menu</h1>
        {role === 'admin' && (
          <div className="flex justify-end">
            <ButtonCustom
              label="Create Product"
              className="bg-black"
              onClick={() => openFormModal()}
            />
          </div>
        )}
      </div>

      <div className="my-8 flex justify-center">
        <SearchBox
          size="max-w-xl"
          handleSearch={handleSearchChange}
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
              className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              {role === 'admin' && (
                <div
                  className="absolute top-2 right-5 rounded-md bg-gray-300 p-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFormModal(product);
                  }}
                  title="Edit Product"
                >
                  <FaRegEdit color="#000" />
                </div>
              )}
              <div
                className="p-4 cursor-pointer flex flex-col"
                onClick={() => navigate(`${ROUTES.SHOP}/${product.id}`)}
              >
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 h-16 overflow-hidden">{product.description}</p>

                <div className="mt-auto h-[50px] flex items-center justify-between space-x-4">
                  <span className="font-extrabold text-lg text-gray-900">{product.price} ฿</span>

                  <span className="font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full shadow-sm select-none">
                    {product.stock} pcs
                  </span>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium select-none ${
                      product.category === 1
                        ? 'bg-yellow-300 text-yellow-900'
                        : 'bg-gray-300 text-gray-800'
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

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={selectedProduct ? 'Edit Product' : 'Create Product'}
        className="bg-white"
      >
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ShopForm />
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
}
