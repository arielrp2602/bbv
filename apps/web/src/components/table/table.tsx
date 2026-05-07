import Link from 'next/link';
import { Eye } from 'lucide-react';
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
  getRowHref?: (row: T) => string;
}

export function Table<T>({ columns, data, getRowHref }: Props<T>) {
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
            {getRowHref && <TableHead />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i} className="even:bg-muted/30 group">
              {columns.map((col) => (
                <TableCell key={String(col.key)}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '-')}
                </TableCell>
              ))}
              {getRowHref && (
                <TableCell className="text-right">
                  <Link
                    href={getRowHref(row)}
                    className="invisible group-hover:visible text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Ver detalle →
                  </Link>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TableUI>
    </div>
  );
}
