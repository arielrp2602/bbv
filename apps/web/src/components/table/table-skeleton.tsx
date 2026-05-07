import { Skeleton } from '../ui/skeleton';

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="rounded-lg border shadow-md overflow-hidden">
      <div className="flex items-center gap-4 px-2 h-10 bg-muted/50 border-b">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3" style={{ width: '20%' }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-2 py-2 border-b last:border-0 even:bg-muted/30"
        >
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton
              key={j}
              className="h-3"
              style={{ width: `${Math.random() * 15 + 12}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
