import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  href: string;
}

export function SidebarLink({ children, href }: Props) {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      className={`py-2 px-3 text-white rounded-sm transition-colors ${isActive ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
    >
      {children}
    </Link>
  );
}
