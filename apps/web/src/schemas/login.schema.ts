import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email().min(6, 'El email es requerido'),
  password: z.string().min(1, 'El password es requerido'),
});

export type LoginDto = z.infer<typeof loginSchema>;
