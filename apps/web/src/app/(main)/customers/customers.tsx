'use client';

import { useCustomerStore } from '@/store/customers.store';
import { Customer } from '@/types';
import { useEffect, useState } from 'react';
import { CustomersSearch } from './customers-search';
import { CustomersList } from './customers-list';
import { Pagination, ViewToggle } from '@/components';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useViewStore } from '@/store/view.store';
import CustomersGrid from './customers-grid';
import { ConditionalRender } from '@/components/conditional-render';
import { GridSkeleton } from '@/components/grid/grid-skeleton';

interface Props {
  initialCustomers: Customer[];
}

const limit = 25;

export function Customers({ initialCustomers }: Props) {
  const path = usePathname();
  const { isLoading, customers, error } = useCustomerStore();
  const { view } = useViewStore();

  const [page, setPage] = useState(1);

  useEffect(() => {
    useCustomerStore.setState({ customers: initialCustomers });
  }, []);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-row-reverse">
        <ViewToggle />
      </div>
      <div className="flex gap-2.5 items-center">
        <CustomersSearch />
        <Link
          className="bg-transparent border-4 border-[#008000] rounded-4xl"
          href={`${path}/create`}
          title="Agregar un nuevo cliente"
        >
          <Plus color="#008000" />
        </Link>
      </div>
      {view === 'table' ? (
        <ConditionalRender
          flag={isLoading}
          whenTrue={<GridSkeleton />}
          whenFalse={<CustomersList customers={customers} />}
        />
      ) : (
        <ConditionalRender
          flag={isLoading}
          whenTrue={<GridSkeleton />}
          whenFalse={<CustomersGrid customers={customers} />}
        />
      )}
      <Pagination
        limit={limit}
        page={page}
        total={customers.length}
        setPage={setPage}
      />
    </div>
  );
}
