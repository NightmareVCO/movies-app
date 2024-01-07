import { z } from 'zod';
import { createMovieSchema } from 'src/movies/dto/schema/base-movie.schema';

export type CreateMovieDto = z.infer<typeof createMovieSchema>;
