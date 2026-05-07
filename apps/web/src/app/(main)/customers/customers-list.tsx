'use client';

import { useMemo } from 'react';
import { Table } from '@/components/';
import { Column, Customer } from '@/types';

interface Props {
  customers: Customer[];
}

export function CustomersList({ customers }: Props) {
  const columns: Column<Customer>[] = useMemo(
    () => [
      { header: 'Nombre', key: 'name' },
      { header: 'Facebook Alias', key: 'facebookAlias' },
      { header: 'Teléfono 1', key: 'phone1' },
      { header: 'Teléfono 2', key: 'phone2' },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={customers}
      getRowHref={(c) => `/customers/${c.id}`}
    />
  );
}
