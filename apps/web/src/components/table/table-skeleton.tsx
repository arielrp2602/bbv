export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
      <div className="flex gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gray-200 rounded animate-pulse"
            style={{ width: `${20}%` }}
          />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 px-6 py-4 border-b border-gray-100 last:border-0"
        >
          {Array.from({ length: cols }).map((_, j) => (
            <div
              key={j}
              className="h-3 bg-gray-100 rounded animate-pulse"
              style={{ width: `${Math.random() * 15 + 12}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
