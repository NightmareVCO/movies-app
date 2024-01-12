import { z } from 'zod';

const GenreEnum = z.enum([
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
]);

export type GenreEnum = z.infer<typeof GenreEnum>;

export const baseGenreSchema = z.object({
  genres: z
    .array(GenreEnum)
    .refine((data) => data.length > 0)
    .refine((data) => {
      if (data.some((genre) => typeof genre !== 'string')) {
        throw new Error('Invalid genre type'); // Mensaje de error personalizado para elementos del array
      }
      return true;
    }),
});

export const createGenreSchema = baseGenreSchema.required();
export const updateGenreSchema = baseGenreSchema.partial();
