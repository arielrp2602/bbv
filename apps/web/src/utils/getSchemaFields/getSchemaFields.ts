import { z } from 'zod';

export function getSchemaFields<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
): (keyof z.infer<T>)[] {
  return Object.keys(schema.shape) as (keyof z.infer<T>)[];
}
