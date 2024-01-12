import { Movie } from '@prisma/client';

export type UserMoviesInfo = {
  favorites: Movie[];
};
