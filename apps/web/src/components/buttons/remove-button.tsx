'use client';

import { SharedButtonProps } from '@/types';
import { Trash } from '@deemlol/next-icons';
import { IconButton } from '@/components';

const color = '#fb2c36';

export function RemoveButton({
  label,
  size = 24,
  title,
  onClick,
}: SharedButtonProps) {
  return (
    <IconButton title={title} onClick={onClick}>
      <div
        color={color}
        className="flex justify-center  items-center gap-x-1 shadow-sm rounded-sm px-3 py-2"
      >
        <Trash size={size} color={color} strokeWidth={3} />
        {!!label && (
          <p color={color} className="text-lg">
            {label}
          </p>
        )}
      </div>
    </IconButton>
  );
}
