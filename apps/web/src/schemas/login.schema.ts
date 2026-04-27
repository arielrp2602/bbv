import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('El email es requerido'),
  password: z.string().min(6, 'El password es requerido'),
});

export type LoginDto = z.infer<typeof loginSchema>;
