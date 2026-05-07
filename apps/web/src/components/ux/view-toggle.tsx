import { useViewStore } from '@/store/view.store';
import { List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ViewToggle() {
  const { view, setView } = useViewStore();

  return (
    <div className="flex border rounded-lg overflow-hidden">
      <Button
        variant={view === 'table' ? 'default' : 'ghost'}
        size="sm"
        className="rounded-none"
        onClick={() => setView('table')}
      >
        <List /> Tabla
      </Button>
      <Button
        variant={view === 'grid' ? 'default' : 'ghost'}
        size="sm"
        className="rounded-none"
        onClick={() => setView('grid')}
      >
        <LayoutGrid /> Grid
      </Button>
    </div>
  );
}
