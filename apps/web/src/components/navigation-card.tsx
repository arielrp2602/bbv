import { NavigationLink } from '@/types';
import Link from 'next/link';

export function NavigationCard({
  description,
  href,
  icon,
  title,
}: NavigationLink) {
  return (
    <Link href={href}>
      <div className="flex items-center bg-white shadow-sm rounded-md p-6 hover:-translate-y-1 transition-transform gap-2">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}
