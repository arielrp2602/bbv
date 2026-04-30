'use client';

import { SharedButtonProps } from '@/types';
import { Trash } from '@deemlol/next-icons';

export function RemoveButton({ size = 24, title, onClick }: SharedButtonProps) {
  return (
    <button className="cursor-pointer" title={title} onClick={onClick}>
      <Trash size={size} color="#fb2c36" strokeWidth={3} />
    </button>
  );
}
