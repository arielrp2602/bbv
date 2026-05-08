'use client';

import { ConditionalRender } from '@/components/conditional-render';
import { Customer } from '@/types';
import { CustomersList } from './customers-list';
import { CustomersSearch } from './customers-search';
import { GridSkeleton } from '@/components/grid/grid-skeleton';
import { Pagination, TableSkeleton, ViewToggle } from '@/components';
import { UserPlus } from 'lucide-react';
import { useCustomerStore } from '@/store/customers.store';
import { useEffect, useState } from 'react';
import { useViewStore } from '@/store/view.store';
import { CustomersGrid } from './customers-grid';
import { CustomerSheets } from './customer-sheets';

interface Props {
  initialCustomers: Customer[];
}

const limit = 100;

export function Customers({ initialCustomers }: Props) {
  const isLoading = useCustomerStore((state) => state.isLoading);
  const customers = useCustomerStore((state) => state.customers);
  const setShowCreateSheet = useCustomerStore(
    (state) => state.setShowCreateSheet,
  );
  const { view } = useViewStore();

  const [page, setPage] = useState(1);

  useEffect(() => {
    useCustomerStore.setState({ customers: initialCustomers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-row-reverse">
        <ViewToggle />
      </div>
      <div className="flex gap-2.5 items-center">
        <CustomersSearch />
        <button
          className="bg-transparent p-1 cursor-pointer"
          title="Agregar un nuevo cliente"
          onClick={() => setShowCreateSheet(true)}
        >
          <UserPlus color="#008000" />
        </button>
      </div>
      {view === 'table' ? (
        <ConditionalRender
          flag={isLoading}
          whenTrue={<TableSkeleton />}
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
      <CustomerSheets />
    </div>
  );
}
