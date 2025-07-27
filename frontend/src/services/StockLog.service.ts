import { API_ROUTES } from '@/constants/ApiConst';
import type { QueryParamsProps } from '@/types/Components';
import type { StockProps } from '@/types/Stock';
import { fetchClient } from '@/utils/axios';

export const StockLogService = {
  QUERY_KEY: 'stockLog',

  getAllStockLog: async (params: QueryParamsProps): Promise<StockProps[]> => {
    const res = await fetchClient.get(`${API_ROUTES.STOCK}`, { params });
    return res.data;
  },
};
