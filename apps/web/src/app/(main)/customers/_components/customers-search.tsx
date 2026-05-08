import { useCustomerStore } from '@/store/customers.store';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CustomersSearch() {
  const { fetchCustomers } = useCustomerStore();
  const [name, setName] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const searchCustomers = (name: string) => {
    fetchCustomers(name);
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (!event.target.value.trim()) fetchCustomers();

    setName(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchCustomers(name);
    }
  };

  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setName('');
    fetchCustomers();
    ref?.current?.focus();
  };

  return (
    <div className="relative w-full">
      <Input
        className="pr-8"
        type="text"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={name}
        placeholder="Busca por nombre o por su alias en Facebook"
        ref={ref}
      />
      <Button
        className="absolute right-1 inset-y-0 my-auto h-fit"
        variant="ghost"
        size="icon-sm"
        disabled={!name.trim().length}
        title="Limpiar el campo de texto"
        onClick={handleClearClick}
      >
        <X className="text-destructive" />
      </Button>
    </div>
  );
}
