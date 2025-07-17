import { API_ROUTES } from '@/constants/ApiConst';
import { ProductDefaultValue, ProductResolver } from '@/dto/Product';
import type { ProductFormProps, ProductsApiResponseProps } from '@/types/Products';
import { fetchClient } from '@/utils/axios';
import { useForm } from 'react-hook-form';

export const ProductService = {
  QUERY_KEY: 'product',

  getAllProducts: async (params?: { search: string }): Promise<ProductsApiResponseProps[]> => {
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
    const res = await fetchClient.patch(`${API_ROUTES.PRODUCT}/${id}`, data);
    return res.data;
  },

  deleteProduct: async (id: number): Promise<ProductsApiResponseProps> => {
    const res = await fetchClient.delete(`${API_ROUTES.PRODUCT}/${id}`);
    return res.data;
  },

  useProductForm: (initialFormData: ProductFormProps = ProductDefaultValue) => {
    return useForm<ProductFormProps>({
      defaultValues: initialFormData,
      resolver: ProductResolver,
    });
  },
};
