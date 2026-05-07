import { links } from '@/constants/navigation';
import { SidebarLink } from './dashboard/siderbar-link';

export const NavigationLinks = () => {
  return (
    <div className="w-62.5 p-6 flex flex-col">
      <h1 className="text-white font-bold text-lg mb-6">Best Brands Vianney</h1>
      <hr className="border-white mb-6 w-full" />
      <nav className="flex flex-col gap-1">
        {links.map(({ href, title }) => (
          <SidebarLink key={href} href={href}>
            {title}
          </SidebarLink>
        ))}
      </nav>
    </div>
  );
};
