'use client';

import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginDto, loginSchema } from '@/schemas/login.schema';
import { getSchemaFields } from '@/utils/getSchemaFields/getSchemaFields';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Error } from '../../../components';

const fields = getSchemaFields(loginSchema);

export default function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginDto> = login;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <div key={field}>
          <input
            {...register(field)}
            type={field === 'password' ? 'password' : 'text'}
          />
          {!!errors[field] && <Error>{errors[field].message}</Error>}
        </div>
      ))}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
