import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie, Prisma } from '@prisma/client';
import { to } from 'src/utils/to';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  // get all movies
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MovieWhereUniqueInput;
    where?: Prisma.MovieWhereInput;
    orderBy?: Prisma.MovieOrderByWithRelationInput;
  }): Promise<Movie[]> {
    const { skip, take, cursor, where, orderBy } = params;

    const [movies, error] = await to(
      this.prisma.movie.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    );
    if (error) throw new Error(String(error));

    return movies;
  }

  // get one movie by id
  async findOne(
    movieWhereUniqueInput: Prisma.MovieWhereUniqueInput,
  ): Promise<Movie | null> {
    const [movie, error] = await to(
      this.prisma.movie.findUnique({
        where: movieWhereUniqueInput,
      }),
    );
    if (error) throw new Error(String(error));

    return movie;
  }

  // create a movie
  async create(data: Prisma.MovieCreateInput): Promise<Movie> {
    const [createdMovie, error] = await to(
      this.prisma.movie.create({
        data,
      }),
    );
    if (error) throw new Error(String(error));

    return createdMovie;
  }
}
