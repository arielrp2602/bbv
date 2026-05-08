import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { Button } from '@/components/ui/button';
import {
  Sheet as SheetShadcn,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Children } from 'react';

interface Props extends SheetPrimitive.Root.Props {
  children: React.ReactNode;
  close: string;
  description: string;
  title: string;
}

export function Sheet({
  children,
  close,
  description,
  title,
  open,
  onOpenChange,
}: Props) {
  const CloseButton = <Button variant="outline" />;
  const childrenArray = Children.toArray(children);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
          onClick={() =>
            (onOpenChange as ((open: boolean) => void) | undefined)?.(false)
          }
        />
      )}
      <SheetShadcn open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="flex-1 flex flex-col bg-muted/30 p-4 gap-7">
            {children}
          </div>
        </SheetContent>
      </SheetShadcn>
    </>
  );
}
