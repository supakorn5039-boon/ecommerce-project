import { ProductCategoryName } from '@/constants/ProductConst';
import type { StockProps } from '@/types/Stock';
import React from 'react';

type HistoryTableProps = {
  data: StockProps[];
};

export default function HistoryTable({ data }: HistoryTableProps) {
  return (
    <React.Fragment>
      {data.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((log: StockProps, idx: number) => (
                <tr
                  key={log.id}
                  className={`border-b ${
                    log.quantity < 0 ? 'bg-red-50' : 'bg-green-50'
                  } hover:bg-gray-50 transition-all`}
                >
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{log.name}</td>
                  <td className="px-6 py-4">{log.quantity}</td>
                  <td className="px-6 py-4">{log.price.toFixed(2)} ฿</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
                        log.category === 1
                          ? 'bg-yellow-300 text-yellow-900'
                          : 'bg-gray-300 text-gray-800'
                      }`}
                    >
                      {ProductCategoryName[log.category ?? 0]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(log.date).toLocaleString('th-TH', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10">
          <svg
            className="w-16 h-16 mb-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m2 0a2 2 0 110-4 2 2 0 010 4zm0 0a2 2 0 110-4 2 2 0 010 4zM9 12a2 2 0 110-4 2 2 0 010 4zm0 0a2 2 0 110-4 2 2 0 010 4z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600">No Data Available</h3>
          <p className="text-gray-500">Try adjusting your filters or come back later.</p>
        </div>
      )}
    </React.Fragment>
  );
}
