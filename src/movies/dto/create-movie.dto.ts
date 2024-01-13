import { z } from 'zod';
import { createMovieSchema } from './schema/base-movie.schema';
import { createGenreSchema } from './genre/schema/base-genre.schema';

export const combinedSchema = createMovieSchema.merge(createGenreSchema);

export type CreateMovieDto = z.infer<typeof combinedSchema>;
