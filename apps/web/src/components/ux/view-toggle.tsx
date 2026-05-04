import { useViewStore } from '@/store/view.store';
import { View } from '@/types';

export function ViewToggle() {
  const { view, setView } = useViewStore();

  return (
    <div className="border border-gray-100 rounded-sm">
      <button
        className={`px-3 py-1.5 text-sm ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-500 hover:bg-gray-50'}`}
        onClick={() => setView('table')}
      >
        ☰ Tabla
      </button>
      <button
        className={`px-3 py-1.5 text-sm ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-500 hover:bg-gray-50'}`}
        onClick={() => setView('grid')}
      >
        ⊞ Grid
      </button>
    </div>
  );
}
