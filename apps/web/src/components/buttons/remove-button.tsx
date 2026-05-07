'use client';

import { SharedButtonProps } from '@/types';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export function RemoveButton({ title, onClick }: SharedButtonProps) {
  return (
    <Button variant="destructive" size="icon" title={title} onClick={onClick}>
      <Trash2 />
    </Button>
  );
}
