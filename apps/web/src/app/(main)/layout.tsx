'use client';

import { useState } from 'react';
import { Menu } from '@deemlol/next-icons';
import { NavigationLinks } from '@/components';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {!isSidebarOpen ? null : (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`
            fixed md:relative z-20
            ${isSidebarOpen ? 'w-62.5' : 'w-0 overflow-hidden'}
            bg-blue-900 min-h-screen transition-all duration-300
        `}
        onClick={() => setIsSidebarOpen(false)}
      >
        <NavigationLinks />
      </div>
      <main className="flex-1 flex flex-col bg-gray-50 p-4 gap-7">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer"
        >
          <Menu size={16} color="#000" strokeWidth={1.5} />
        </button>
        {children}
      </main>
    </div>
  );
}
