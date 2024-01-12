import { z } from 'zod';
import { updateUserSchema } from './schema/base-user.schema';

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
