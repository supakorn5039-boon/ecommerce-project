import { API_ROUTES } from '@/constants/ApiConst';
import type { Products } from '@/types/Products';
import { fetchClient } from '@/utils/axios';

export const ProductService = {
  QUERY_KEY: 'product',

  getAllProducts: async (): Promise<Products[]> => {
    const res = await fetchClient.get(API_ROUTES.PRODUCT);
    return res.data;
  },

  getProductById: async (id: number): Promise<Products> => {
    const res = await fetchClient.get(`${API_ROUTES.PRODUCT}/${id}`);
    return res.data;
  },
};
