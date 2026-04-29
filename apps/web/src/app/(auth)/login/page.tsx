'use client';

import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginDto, loginSchema } from '@/schemas/login.schema';
import { getSchemaFields } from '@/utils/getSchemaFields/getSchemaFields';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Error } from '../../../components';

const fields = getSchemaFields(loginSchema);

export default function Login() {
  const { login, serverError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginDto> = login;

  return (
    <form
      className="bg-white rounded-md shadow-md p-8 w-[90%] md:w-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1>
      {fields.map((field) => (
        <div key={field} className="mb-4">
          <input
            {...register(field)}
            className="w-full border border-gray-200 rounded-sm px-3 py-2 focus:border-blue-500 focus:outline-none"
            type={field === 'password' ? 'password' : 'text'}
          />
          {!!errors[field] && <Error>{errors[field].message}</Error>}
        </div>
      ))}
      {serverError && <Error>{serverError}</Error>}
      <button
        className="w-full mt-6 bg-blue-500 text-white py-2 hover:bg-blue-700 rounded-sm transition-colors cursor-pointer"
        type="submit"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
