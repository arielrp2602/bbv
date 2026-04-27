import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email('El email es requerido'),
  password: z.string().min(6, 'El password debe tener mínimo 6 caractéres'),
  role: z.enum(['ADMIN', 'EMPLOYEE']),
});

export type RegisterDto = z.infer<typeof registerSchema>;
