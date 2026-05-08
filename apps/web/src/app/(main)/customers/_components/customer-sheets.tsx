import { Sheet } from '@/components';
import { CustomerDto } from '@/schemas/customer.schema';
import { useCustomerStore } from '@/store/customers.store';
import { CustomerForm } from './customer-form';

export function CustomerSheets() {
  const showCreateSheet = useCustomerStore((state) => state.showCreateSheet);
  const setShowCreateSheet = useCustomerStore(
    (state) => state.setShowCreateSheet,
  );
  const selectedCustomer = useCustomerStore((state) => state.selectedCustomer);
  const createCustomer = useCustomerStore((state) => state.createCustomer);
  const setSelectedCustomer = useCustomerStore(
    (state) => state.setSelectedCustomer,
  );
  const updateCustomer = useCustomerStore((state) => state.updateCustomer);

  const handleUpdateSubmit = async (data: CustomerDto) => {
    await updateCustomer(selectedCustomer!.id, data);
  };

  const handleCreateSubmit = async (data: CustomerDto) => {
    await createCustomer(data);
    setShowCreateSheet(false);
  };

  console.log({ selectedCustomer, showCreateSheet });

  return (
    <div>
      <Sheet
        open={!!selectedCustomer}
        description="Solo el nombre es requerido, el resto son opcionales"
        title="Actualizar cliente"
        onOpenChange={(open) => !open && setSelectedCustomer(null)}
      >
        <CustomerForm
          defaultValues={selectedCustomer}
          submitLabel="Guardar cambios"
          onHandleSubmit={(data) => handleUpdateSubmit(data)}
        />
      </Sheet>
      <Sheet
        open={showCreateSheet}
        description="Solo el nombre es requerido, el resto son opcionales"
        title="Crear cliente"
        onOpenChange={(open) => !open && setShowCreateSheet(false)}
      >
        <CustomerForm
          submitLabel="Crear cliente"
          onHandleSubmit={(data) => handleCreateSubmit(data)}
        />
      </Sheet>
    </div>
  );
}
