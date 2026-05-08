import { Customer } from '@/types';
import { CustomerCard } from './customer-card';
import { useCustomerStore } from '@/store/customers.store';
import { Grid } from '@/components';

interface Props {
  customers: Customer[];
}

export function CustomersGrid({ customers }: Props) {
  const setSelectedCustomer = useCustomerStore(
    (state) => state.setSelectedCustomer,
  );

  return (
    <Grid>
      {customers.map((customer, index) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onClick={() => setSelectedCustomer(customer)}
          tabIndex={index}
        />
      ))}
    </Grid>
  );
}
