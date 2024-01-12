import { z } from 'zod';

const baseMovieIdSchema = z.object({
  movieId: z
    .string({
      required_error: 'Id is required',
      invalid_type_error: 'Id must be a string',
    })
    .uuid(),
});

export const findMovieByIdSchema = baseMovieIdSchema.required();
