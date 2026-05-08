'use client';

import { ConditionalRender } from '@/components/conditional-render';
import { Customer } from '@/types';
import { CustomersList } from './customers-list';
import { CustomersSearch } from './customers-search';
import { GridSkeleton } from '@/components/grid/grid-skeleton';
import { Pagination, Sheet, TableSkeleton, ViewToggle } from '@/components';
import { Plus } from 'lucide-react';
import { UpdateCustomerForm } from '../update-customer-form';
import { useCustomerStore } from '@/store/customers.store';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useViewStore } from '@/store/view.store';
import CustomersGrid from './customers-grid';
import Link from 'next/link';

interface Props {
  initialCustomers: Customer[];
}

const limit = 25;

export function Customers({ initialCustomers }: Props) {
  const path = usePathname();
  const { isLoading, customers, selectedCustomer, setSelectedCustomer } =
    useCustomerStore();
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
      <Sheet
        open={!!selectedCustomer}
        close="Cerrar"
        description="Solo el nombre es requerido, el resto son opcionales"
        title="Actualizar cliente"
        onOpenChange={(open) => !open && setSelectedCustomer(null)}
      >
        <UpdateCustomerForm />
      </Sheet>
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
    </div>
  );
}
