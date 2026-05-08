import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import {
  Sheet as SheetShadcn,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface Props extends SheetPrimitive.Root.Props {
  children: React.ReactNode;
  description: string;
  title: string;
}

export function Sheet({
  children,
  description,
  title,
  open,
  onOpenChange,
}: Props) {
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
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </SheetContent>
      </SheetShadcn>
    </>
  );
}
