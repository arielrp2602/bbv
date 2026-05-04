import { Column } from '@/types';
import { TableSkeleton } from '@/components';
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  showDetailsLink?: boolean;
  onDelete?: (item: T) => void;
}

export function Table<T>({
  columns,
  data,
  loading,
  showDetailsLink,
  onDelete,
}: Props<T>) {
  if (loading !== undefined && loading) {
    return <TableSkeleton />;
  }

  const hasActions = !!onDelete || !!showDetailsLink;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-100 shadow-md">
      <TableUI className="w-full">
        <TableHeader className="bg-gray-50">
          <TableRow>
            {columns.map((col) => {
              if (col.shouldSkipRender) return null;

              return (
                <TableHead
                  key={String(col.key)}
                  className="px-6 py-3 text-left text-sm text-gray-500"
                >
                  {col.header}
                </TableHead>
              );
            })}
            {!hasActions ? null : (
              <TableHead className="px-6 py-3 text-left text-sm text-gray-500">
                Acciones
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              className="border-b border-gray-100 even:bg-gray-100 odd:bg-white"
            >
              {columns.map((col) => (
                <TableCell key={String(col.key)} className="px-6 py-4">
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
