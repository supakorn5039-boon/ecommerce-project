import { ProductCategoryName } from '@/constants/ProductConst';
import { ProductService } from '@/services/Product.service';
import { useCartStore } from '@/store/features/cart/useCartStore';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

export default function ShopDetail(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductService.getProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center py-10">Loading product...</div>;
  if (isError || !product) return <div className="text-center py-10 text-red-500">Product not found</div>;

  return (
    <React.Fragment>
      <button onClick={() => navigate(-1)} className="mb-6 ml-[2rem] flex space-x-4 items-center text-blue-500 hover:underline text-base">
        <MdOutlineKeyboardArrowLeft size={24} className="mr-[0.5rem]" /> Back to Shop
      </button>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-[450px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl shadow-lg" />
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
                  product.category === 1 ? 'bg-yellow-300 text-yellow-900' : 'bg-gray-300 text-gray-800'
                }`}
              >
                {ProductCategoryName[product.category]}
              </span>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">{product.description}</p>

              <p className="text-3xl font-semibold text-green-600 dark:text-green-400">{product.price} ฿</p>
            </div>

            <div className="mt-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Stock: {product.stock}</p>
              <button
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold text-lg transition ${
                  product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
