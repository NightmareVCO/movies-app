import { z } from 'zod';

const validateGenreSchema = z
  .object({
    name: z.array(
      z.enum([
        'Action',
        'Crime',
        'Romance',
        'Adventure',
        'Animation',
        'Biography',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'Sci-Fi',
        'Thriller',
        'War',
      ]),
    ),
  })
  .required();

export type ValidateGenreDto = z.infer<typeof validateGenreSchema>;
