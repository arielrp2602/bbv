'use client';

import { useCustomerStore } from '@/store/customers.store';
import { Customer } from '@/types';
import { useEffect, useState } from 'react';
import { CustomersSearch } from './customers-search';
import { CustomersList } from './customers-list';
import { Pagination } from '@/components';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle } from '@deemlol/next-icons';

interface Props {
  initialCustomers: Customer[];
}

const limit = 25;

export function Customers({ initialCustomers }: Props) {
  const path = usePathname();
  const { loading, customers, error } = useCustomerStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    useCustomerStore.setState({ customers: initialCustomers });
  }, []);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex gap-2.5">
        <CustomersSearch />
        <Link
          className="flex justify-center items-center"
          href={`${path}/create`}
          title="Agregar un nuevo cliente"
        >
          <PlusCircle size={24} color="#008000" strokeWidth={3} />
        </Link>
      </div>
      <CustomersList customers={customers} loading={loading} />
      <Pagination
        limit={limit}
        page={page}
        total={customers.length}
        setPage={setPage}
      />
    </div>
  );
}
