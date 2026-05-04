'use client';

import { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RemoveButton, Table } from '@/components/';
import { TableActions } from '@/components/table/table-actions';
import { BookOpen } from '@deemlol/next-icons';
import { Column, Customer } from '@/types';

interface Props {
  customers: Customer[];
  loading: boolean;
}

export function CustomersList({ customers, loading }: Props) {
  const path = usePathname();

  const handleDelete = useCallback((c: Customer) => {
    console.log({ c });
  }, []);

  const columns: Column<Customer>[] = useMemo(
    () => [
      {
        header: 'Nombre',
        key: 'name',
      },
      {
        header: 'Facebook Alias',
        key: 'facebookAlias',
      },
      {
        header: 'Teléfono 1',
        key: 'phone1',
      },
      {
        header: 'Teléfono 2',
        key: 'phone2',
      },
      {
        header: 'Acciones',
        key: 'id',
        shouldSkipRender: true,
        render: (customer: Customer) => (
          <TableActions>
            <Link
              href={`/customers/${customer.id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              <BookOpen size={24} strokeWidth={3} color="#0000FF" />
            </Link>
            <RemoveButton
              label="Eliminar cliente"
              onClick={() => handleDelete(customer)}
            />
          </TableActions>
        ),
      },
    ],
    [handleDelete],
  );

  return (
    <Table
      columns={columns}
      data={customers}
      loading={loading}
      path={path}
      showDetailsLink
      onDelete={handleDelete}
    />
  );
}
