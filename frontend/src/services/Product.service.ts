import { API_ROUTES } from '@/constants/ApiConst';
import { ProductResolver } from '@/dto/ProductDTO';
import type { QueryParamsProps } from '@/types/Components';
import type {
  CheckoutProps,
  CheckoutResponseProps,
  ProductFormProps,
  ProductsApiResponseProps,
} from '@/types/Products';
import { fetchClient } from '@/utils/axios';
import { useForm } from 'react-hook-form';

export const ProductService = {
  QUERY_KEY: 'product',

  getAllProducts: async (params?: QueryParamsProps): Promise<ProductsApiResponseProps[]> => {
    const res = await fetchClient.get(`${API_ROUTES.PRODUCT}`, { params });
    return res.data;
  },

  getProductById: async (id: number): Promise<ProductsApiResponseProps> => {
    const res = await fetchClient.get(`${API_ROUTES.PRODUCT}/${id}`);
    return res.data;
  },

  createProduct: async (data: ProductFormProps): Promise<ProductsApiResponseProps> => {
    const res = await fetchClient.post(`${API_ROUTES.PRODUCT}`, data);
    return res.data;
  },

  updateProduct: async (id: number, data: ProductFormProps): Promise<ProductsApiResponseProps> => {
    const res = await fetchClient.put(`${API_ROUTES.PRODUCT}/${id}`, data);
    return res.data;
  },

  deleteProduct: async (id: number): Promise<ProductsApiResponseProps> => {
    const res = await fetchClient.delete(`${API_ROUTES.PRODUCT}/${id}`);
    return res.data;
  },

  checkoutProduct: async (items: CheckoutProps[]): Promise<CheckoutResponseProps> => {
    const res = await fetchClient.post(`${API_ROUTES.PRODUCT}/checkout`, { items });
    return res.data;
  },

  useProductForm: (initialFormData: ProductFormProps) => {
    return useForm<ProductFormProps>({
      defaultValues: initialFormData,
      resolver: ProductResolver,
    });
  },
};
