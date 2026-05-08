'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateCustomerDto,
  updateCustomerSchema,
} from '@/schemas/update-customer.schema';
import { getSchemaFields } from '@/utils/getSchemaFields/getSchemaFields';
import { useCustomerStore } from '@/store/customers.store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Error } from '@/components';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormInputType } from '@/types';

const fields = getSchemaFields(updateCustomerSchema);
const fieldMap: Record<(typeof fields)[number], FormInputType> = {
  name: { label: 'nombre' },
  address: { label: 'domicilio', component: Textarea },
  facebookAlias: { label: 'nombre facebook' },
  phone1: { label: 'teléfono 1' },
  phone2: { label: 'teléfono 2' },
};

export function UpdateCustomerForm() {
  const { selectedCustomer, updateCustomer } = useCustomerStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UpdateCustomerDto>({
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: selectedCustomer ?? {},
  });

  const onSubmit: SubmitHandler<UpdateCustomerDto> = (data) =>
    updateCustomer(selectedCustomer!.id, data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="user-form">
      {fields.map((field) => {
        const Element = fieldMap[field].component ?? Input;

        return (
          <div key={field} className="mb-4">
            <Label htmlFor={field} className="capitalize mb-2">
              {fieldMap[field].label}
            </Label>
            <Element {...register(field)} id={field} />
            {!!errors[field] && <Error>{errors[field].message}</Error>}
          </div>
        );
      })}
      <Button
        className="w-full mt-6"
        type="submit"
        form="user-form"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : 'Guardar cambios'}
      </Button>
    </form>
  );
}
