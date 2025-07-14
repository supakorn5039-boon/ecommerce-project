import { ProductCategoryName } from '@/constants/ProductConst';
import { ROUTES } from '@/constants/RouteConst';
import { ProductService } from '@/services/Product.service';
import { Products } from '@/types/Products';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function ShopIndex() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Products[]>({
    queryKey: [ProductService.QUERY_KEY],
    queryFn: ProductService.getAllProducts,
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error loading products</div>;
  }

  if (!products) throw new Error('Products not found');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Coffee Shop Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
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
                  {ProductCategoryName[product.category]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
