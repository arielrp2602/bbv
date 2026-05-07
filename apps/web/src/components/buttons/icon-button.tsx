'use client';

import { SharedButtonProps } from '@/types';
import { Button } from '../ui/button';

interface Props extends Omit<SharedButtonProps, 'size' | 'label'> {
  children: React.ReactNode;
}

export function IconButton({ children, title, onClick }: Props) {
  return (
    <Button className="cursor-pointer" title={title} onClick={onClick}>
      {children}
    </Button>
  );
}
