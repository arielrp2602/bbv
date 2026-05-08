import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  address: z.string().optional(),
  facebookAlias: z.string().optional(),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
});

export type CustomerDto = z.infer<typeof customerSchema>;
