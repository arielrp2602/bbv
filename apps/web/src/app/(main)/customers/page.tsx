import { Customer } from '@/types';
import { Customers } from './customers';
import { serverFetch } from '@/lib/serverApi';

export default async function CustomersPage() {
  const customers = await serverFetch<Customer[]>('/customers');

  return <Customers initialCustomers={customers} />;
}
