import { z } from 'zod';
import { updateMovieSchema } from 'src/movies/dto/schema/base-movie.schema';
import { createGenreSchema } from './genre/schema/base-genre.schema';

export const combinedSchema = updateMovieSchema.merge(createGenreSchema);

export type UpdateMovieDto = z.infer<typeof combinedSchema>;
