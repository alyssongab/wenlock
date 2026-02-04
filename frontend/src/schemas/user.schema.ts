import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int(),
  nome: z.string(),
  email: z.string().email(),
  createdAt: z.coerce.date(),
});

export const createUserSchema = z.object({
  nome: z
    .string()
    .max(30, 'Máximo 30 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  matricula: z
    .number()
    .int('A matrícula deve ser um número inteiro')
    .min(1000, 'A matrícula deve ter no mínimo 4 dígitos')
    .max(9999999999, 'A matrícula deve ter no máximo 10 dígitos'),
  
  email: z
    .email("Email inválido"),
  
  senha: z
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .regex(/^[a-zA-Z0-9]+$/, 'Apenas caracteres alfanuméricos'),
});

export const updateUserSchema = createUserSchema.partial();

export const paginationQuerySchema = z.object({
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).optional(),
  name: z.string().optional(),
});

export const paginatedResponseSchema = z.object({
  data: z.array(userSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    count: z.number(),
    search: z.object({
      name: z.string().optional(),
    }).optional(),
  }),
});

export type User = z.infer<typeof userSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;
