import { Column } from '@/types';
import { RemoveButton, TableSkeleton } from '@/components';
import Link from 'next/link';
import { FileText } from '@deemlol/next-icons';

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  path?: string;
  showDetailsLink?: boolean;
  onDelete?: (item: T) => void;
}

export function Table<T>({
  columns,
  data,
  loading,
  path,
  showDetailsLink,
  onDelete,
}: Props<T>) {
  if (loading !== undefined && loading) {
    return <TableSkeleton />;
  }

  const hasActions = !!onDelete || !!showDetailsLink;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-100 shadow-md">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => {
              if (col.shouldSkipRender) return null;

              return (
                <th
                  key={String(col.key)}
                  className="px-6 py-3 text-left text-sm text-gray-500"
                >
                  {col.header}
                </th>
              );
            })}
            {!hasActions ? null : (
              <th className="px-6 py-3 text-left text-sm text-gray-500">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 even:bg-gray-100 odd:bg-white"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4">
                  {col.render ? col.render(row) : String(row[col.key] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
