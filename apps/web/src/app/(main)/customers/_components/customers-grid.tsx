import { links } from '@/constants/navigation';
import { Customer } from '@/types';
import { CustomerCard } from './customer-card';
import Link from 'next/link';

interface Props {
  customers: Customer[];
}

export default function CustomersGrid({ customers }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {customers.map((customer) => (
        <Link key={customer.id} href={`/customers/${customer.id}`}>
          <CustomerCard key={customer.id} customer={customer} />
        </Link>
      ))}
    </div>
  );
}
