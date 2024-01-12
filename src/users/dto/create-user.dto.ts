import { z } from 'zod';
import { createUserSchema } from './schema/base-user.schema';

export type CreateUserDto = z.infer<typeof createUserSchema>;
