'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Error } from '@/components';
import { getSchemaFields } from '@/utils/getSchemaFields/getSchemaFields';
import { Input } from '@/components/ui/input';
import { LoginDto, loginSchema } from '@/schemas/login.schema';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/useAuth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const fields = getSchemaFields(loginSchema);

export default function Login() {
  const { login, serverError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginDto> = login;

  return (
    <Card className="w-[90%] md:w-100">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <div key={field} className="mb-4">
              <Input
                {...register(field)}
                type={field === 'password' ? 'password' : 'text'}
              />
              {!!errors[field] && <Error>{errors[field].message}</Error>}
            </div>
          ))}
          {serverError && <Error>{serverError}</Error>}
          <Button className="w-full mt-6" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Iniciar sesión'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
