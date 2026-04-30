import { useCustomerStore } from '@/store/customers.store';
import { useRef, useState } from 'react';
import { X } from '@deemlol/next-icons';

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
      <input
        className="w-full rounded-sm px-3 py-2 pr-8 border border-gray-500 focus:outline-none"
        type="text"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={name}
        placeholder="Busca por nombre o por su alias en Facebook"
        ref={ref}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm focus:outline-none focus:border focus:border-black disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!name.trim().length}
        title="Limpiar el campo de texto"
        onClick={handleClearClick}
      >
        <X size={24} color="#fb2c36" strokeWidth={3} />
      </button>
    </div>
  );
}
