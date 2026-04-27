import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  price: z.number().positive('El precio debe ser mayor a 0'),
  stock: z.number().int().min(0),
  categoryId: z.cuid(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
