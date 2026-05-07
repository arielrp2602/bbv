'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationLinks } from './navigation-links';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sheet>
        <main className="flex-1 flex flex-col bg-muted/30 p-4 gap-7">
          <SheetTrigger render={<Button variant="ghost" size="icon" />}>
            <Menu size={16} />
          </SheetTrigger>
          {children}
        </main>
        <SheetContent side="left" className="p-0 w-62.5 bg-gray-500">
          <NavigationLinks />
        </SheetContent>
      </Sheet>
    </div>
  );
}
