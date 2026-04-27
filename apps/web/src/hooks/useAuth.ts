import axios from '../lib/axios';
import { useRouter } from 'next/navigation';
import { LoginDto } from '@/schemas/login.schema';
import { RegisterDto } from '@/schemas/register.schema';
import { useState } from 'react';
import { getRequestErrorMessage } from '@/utils/';

export function useAuth() {
  const router = useRouter();

  const [serverError, setServerError] = useState('');

  async function login(dto: LoginDto) {
    try {
      await axios.post('/auth/login', dto);
      router.push('/dashboard');
    } catch (err) {
      setServerError(getRequestErrorMessage(err));
      throw err;
    }
  }

  async function register(dto: RegisterDto) {
    try {
      await axios.post('/auth/register', dto);
      router.push('/dashboard');
    } catch (err) {
      setServerError(getRequestErrorMessage(err));
      throw err;
    }
  }

  return { login, register, serverError };
}
