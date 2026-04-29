import { NavigationCard } from '@/components/navigation-card';
import { links } from '@/constants/navigation';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {links.map((link) => (
        <NavigationCard key={link.href} {...link} />
      ))}
    </div>
  );
}
