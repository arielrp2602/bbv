import { ChevronLeft, ChevronRight } from '@deemlol/next-icons';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

interface Props {
  limit: number;
  page: number;
  total: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function Pagination({ limit, page, total, setPage }: Props) {
  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <Button
        variant="outline"
        size="icon"
        disabled={page === 1}
        title="Página anterior"
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft size={16} strokeWidth={2} />
      </Button>
      <span className="text-sm text-muted-foreground px-1">Página {page}</span>
      <Button
        variant="outline"
        size="icon"
        disabled={total < limit}
        title="Siguiente página"
        onClick={() => setPage(page + 1)}
      >
        <ChevronRight size={16} strokeWidth={2} />
      </Button>
    </div>
  );
}
