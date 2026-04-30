import React from 'react';

export function TableActions({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
}
