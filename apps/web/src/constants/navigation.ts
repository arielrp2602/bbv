import { NavigationLink } from '@/types';

export const links: NavigationLink[] = [
  {
    icon: '👥',
    title: 'Clientes',
    description: 'Administra tus clientes',
    href: '/customers',
  },
  {
    icon: '📋',
    title: 'Notas',
    description: 'Gestiona las notas de venta',
    href: '/notes',
  },
  {
    icon: '💰',
    title: 'Pagos',
    description: 'Registra abonos y pagos',
    href: '/payments',
  },
];
