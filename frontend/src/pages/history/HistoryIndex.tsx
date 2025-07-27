import SkeletonLoading from '@/components/loading/SkeletonLoading';
import SearchBox from '@/components/utils/SearchBox';
import { StockLogService } from '@/services/StockLog.service';
import type { QueryParamsProps } from '@/types/Components';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import HistoryTable from './HistoryTable';

export default function HistoryIndex() {
  const [filter, setFilter] = useState<QueryParamsProps>({
    page: 1,
    search: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: [StockLogService.QUERY_KEY, filter],
    queryFn: () => StockLogService.getAllStockLog(filter),
  });

  const stockLogs = data ?? [];
  const totalItems = data?.length ?? 0;
  const pageSize = 10;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (direction: 'prev' | 'next') => {
    setFilter((prev) => ({
      ...prev,
      page: direction === 'next' ? prev?.page! + 1 : prev?.page! - 1,
    }));
  };

  return (
    <React.Fragment>
      <div className="flex justify-center mb-4">
        <SearchBox
          handleSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter({ ...filter, search: e.target.value, page: 1 })
          }
          searchQuery={filter.search ?? ''}
        />
      </div>

      {isLoading ? <SkeletonLoading /> : <HistoryTable data={stockLogs} />}

      <div className="flex justify-between items-center mt-4 px-2">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={filter.page === 1}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          {' '}
          Page {filter.page} of {totalPages}{' '}
        </span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={filter?.page! >= totalPages}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </React.Fragment>
  );
}
