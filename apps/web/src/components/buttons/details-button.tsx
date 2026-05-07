'use client';

import { SharedButtonProps } from '@/types';
import { Eye } from 'lucide-react';
import { Button } from '../ui/button';

export function DetailsButton({ title, onClick }: SharedButtonProps) {
  return (
    <Button variant="outline" size="icon" title={title} onClick={onClick}>
      <Eye />
    </Button>
  );
}
