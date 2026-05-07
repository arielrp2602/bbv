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
      className={`py-2 px-3 text-white rounded-sm ${isActive ? 'font-bold underline' : 'hover:font-bold'}`}
    >
      {children}
    </Link>
  );
}
