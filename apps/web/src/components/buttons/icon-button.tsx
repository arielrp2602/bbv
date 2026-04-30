'use client';

import { SharedButtonProps } from '@/types';

interface Props extends Omit<SharedButtonProps, 'size' | 'label'> {
  children: React.ReactNode;
}

export function IconButton({ children, title, onClick }: Props) {
  return (
    <button className="cursor-pointer" title={title} onClick={onClick}>
      {children}
    </button>
  );
}
