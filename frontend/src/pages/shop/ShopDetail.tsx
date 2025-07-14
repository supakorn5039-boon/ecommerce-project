import { ProductCategoryName } from '@/constants/ProductConst';
import { ProductService } from '@/services/Product.service';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

export default function ShopDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
    <div className="max-w-5xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-500 hover:underline text-sm">
        ← Back to Shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl shadow-md" />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                product.category === 1 ? 'bg-yellow-300 text-yellow-900' : 'bg-gray-300 text-gray-800'
              }`}
            >
              {ProductCategoryName[product.category]}
            </span>

            <p className="text-gray-700 mb-4">{product.description}</p>

            <p className="text-2xl font-semibold text-green-600">{product.price} ฿</p>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <button
              disabled={product.stock === 0}
              className={`mt-3 w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
                product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
