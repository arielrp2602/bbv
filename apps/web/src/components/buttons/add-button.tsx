'use client';

import { SharedButtonProps } from '@/types';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function AddButton({ title, onClick }: SharedButtonProps) {
  return (
    <Button variant="outline" size="icon" title={title} onClick={onClick}>
      <Plus />
    </Button>
  );
}
