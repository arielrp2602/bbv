'use client';

import { SharedButtonProps } from '@/types';
import { FileText } from '@deemlol/next-icons';

export function DetailsButton({
  size = 24,
  title,
  onClick,
}: SharedButtonProps) {
  return (
    <button className="cursor-pointer" title={title} onClick={onClick}>
      <FileText size={size} color="#0000FF" strokeWidth={3} />
    </button>
  );
}
