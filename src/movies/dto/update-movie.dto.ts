import { z } from 'zod';
import { updateMovieSchema } from 'src/movies/dto/schema/base-movie.schema';

export type UpdateMovieDto = z.infer<typeof updateMovieSchema>;
