import { z } from 'zod';
import { singInSchema } from './schema/base-singIn.schema';

export type SingInDtoType = z.infer<typeof singInSchema>;
