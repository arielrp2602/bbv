import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Column } from '@/types';

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function Table<T>({ columns, data, onRowClick }: Props<T>) {
  const handleClick = (row: T) => {
    onRowClick?.(row);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTableRowElement>,
    row: T,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onRowClick?.(row);
    }
  };

  const hasRowClick = !!onRowClick;

  return (
    <div className="rounded-lg border shadow-md overflow-hidden">
      <TableUI>
        <TableHeader className="bg-muted/50">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className="text-muted-foreground"
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              className={`even:bg-muted/30 ${hasRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => handleClick(row)}
              onKeyDown={(e) => handleKeyDown(e, row)}
              role={hasRowClick ? 'button' : undefined}
              tabIndex={hasRowClick ? 0 : undefined}
            >
              {columns.map((col) => (
                <TableCell key={String(col.key)}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '-')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableUI>
    </div>
  );
}
