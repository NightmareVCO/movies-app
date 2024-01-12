import { z } from 'zod';

const baseUserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(2)
    .max(45),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
  number: z
    .string({
      required_error: 'Number is required',
      invalid_type_error: 'Number must be a string',
    })
    .min(10)
    .max(15),
  role: z.enum(['ADMIN', 'USER']),
});

export const createUserSchema = baseUserSchema.required();
export const updateUserSchema = baseUserSchema.partial();
