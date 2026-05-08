import { Customer } from '@/types';
import { Customers } from './_components/customers';
import { serverFetch } from '@/lib/serverApi';

export default async function CustomersPage() {
  const customers = await serverFetch<Customer[]>('/customers');

  return <Customers initialCustomers={customers} />;
}
