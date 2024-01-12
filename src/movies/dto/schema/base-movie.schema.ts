import { z } from 'zod';

const currentYear = new Date().getFullYear();

const baseMovieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string',
  }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be an integer number',
    })
    .int()
    .gte(1888)
    .lte(currentYear),
  director: z.string({
    required_error: 'Director is required',
    invalid_type_error: 'Director must be a string',
  }),
  duration: z
    .number({
      required_error: 'Duration is required',
      invalid_type_error: 'Duration must be an integer number',
    })
    .int(),
  poster: z
    .string()
    .url({ message: 'Poster must be a valid ULR' })
    .endsWith('.jpg')
    .nullable(),
  rate: z
    .number({
      required_error: 'Rate is required',
      invalid_type_error: 'Rate must be a number',
    })
    .gte(0)
    .lte(10)
    .default(5),
});

export const createMovieSchema = baseMovieSchema.required();
export const updateMovieSchema = baseMovieSchema.partial();
