'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerDto, customerSchema } from '@/schemas/customer.schema';
import { getSchemaFields } from '@/utils/getSchemaFields/getSchemaFields';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Error } from '@/components';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Customer, FormInputType } from '@/types';

interface Props {
  defaultValues?: Customer | null;
  submitLabel: string;
  onHandleSubmit: (data: CustomerDto) => Promise<void>;
}

const fields = getSchemaFields(customerSchema);
const fieldMap: Record<(typeof fields)[number], FormInputType> = {
  name: { label: 'nombre' },
  address: { label: 'domicilio', component: Textarea },
  facebookAlias: { label: 'facebook alias' },
  phone1: { label: 'teléfono 1' },
  phone2: { label: 'teléfono 2' },
};

export function CustomerForm({
  defaultValues,
  submitLabel,
  onHandleSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CustomerDto>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaultValues ?? {},
  });

  const onSubmit: SubmitHandler<CustomerDto> = onHandleSubmit;

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
        {isSubmitting ? <Spinner /> : submitLabel}
      </Button>
    </form>
  );
}
