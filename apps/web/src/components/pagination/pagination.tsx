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
    <div className="flex justify-end gap-2 mt-4">
      <Button
        className="px-3 py-1 border rounded-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        disabled={page === 1}
        title="Página anterior"
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft size={24} color="#000" strokeWidth={3} />
      </Button>
      <span className="px-3 py-1">Página {page}</span>
      <Button
        className="px-3 py-1 border rounded-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        disabled={total < limit}
        title="Siguiente página"
        onClick={() => setPage(page + 1)}
      >
        <ChevronRight size={24} color="#000" strokeWidth={3} />
      </Button>
    </div>
  );
}
