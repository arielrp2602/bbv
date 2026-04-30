'use client';

import { SharedButtonProps } from '@/types';
import { PlusCircle } from '@deemlol/next-icons';
import { IconButton } from './icon-button';

export function AddButton({ size = 24, title, onClick }: SharedButtonProps) {
  return (
    <IconButton title={title} onClick={onClick}>
      <PlusCircle size={size} color="#008000" strokeWidth={3} />
    </IconButton>
  );
}
