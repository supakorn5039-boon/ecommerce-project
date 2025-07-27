export default function SkeletonLoading() {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 animate-pulse">
      <table className="min-w-full table-auto text-sm text-left text-gray-700">
        <tbody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr key={idx} className="border-b bg-gray-50">
              {Array.from({ length: 6 }).map((_, colIdx) => (
                <td key={colIdx} className="px-6 py-4">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
