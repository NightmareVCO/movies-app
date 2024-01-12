import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie, Prisma } from '@prisma/client';
import { to } from 'src/utils/to';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}
  // create a movie
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { genres, ...movieInput } = createMovieDto;
    // transform genre array into array of objects
    const genreGenreEnumType = genres.map((genreName) => ({ name: genreName }));
    const [createdMovie, error] = await to(
      this.createWithGenres({
        data: { ...movieInput },
        genre: genreGenreEnumType,
      }),
    );
    if (error) throw new Error(String(error));

    return createdMovie;
  }
  //create movie with genres
  async createWithGenres(params: {
    data: Prisma.MovieCreateInput;
    genre: Prisma.GenreWhereUniqueInput[];
  }): Promise<Movie> {
    const { data, genre } = params;

    const [createdMovie, error] = await to(
      this.prisma.movie.create({
        data: {
          ...data,
          genre: {
            connect: genre,
          },
        },
      }),
    );
    if (error) throw new Error(String(error));

    return createdMovie;
  }

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
        include: {
          genre: true,
        },
      }),
    );
    if (error) throw new Error(String(error));

    return movies;
  }

  // get one movie by id
  async findOne(params: {
    where: Prisma.MovieWhereUniqueInput;
  }): Promise<Movie | null> {
    const { where } = params;

    const [movie, error] = await to(
      this.prisma.movie.findUnique({
        where,
        include: {
          genre: true,
        },
      }),
    );
    if (error) throw new Error(String(error));

    return movie;
  }

  // update a movie
  async update(updateMovieDto: UpdateMovieDto, id: string): Promise<Movie> {
    const { genres, ...movieInput } = updateMovieDto;
    // transform genre array into array of objects
    const genreGenreEnumType = genres.map((genreName) => ({ name: genreName }));

    const [updatedMovie, error] = await to(
      this.updateWithGenres({
        where: { id: String(id) },
        data: { ...movieInput },
        genre: genreGenreEnumType,
      }),
    );
    if (error) throw new Error(String(error));

    return updatedMovie;
  }

  // update movie with genres
  async updateWithGenres(params: {
    where: Prisma.MovieWhereUniqueInput;
    data: Prisma.MovieUpdateInput;
    genre: Prisma.GenreWhereUniqueInput[];
  }): Promise<Movie> {
    const { where, data, genre } = params;

    const [updatedMovie, error] = await to(
      this.prisma.movie.update({
        data: {
          ...data,
          genre: {
            connect: genre,
          },
        },
        where,
      }),
    );
    if (error) throw new Error(String(error));

    return updatedMovie;
  }

  // delete a movie
  async remove(params: {
    where: Prisma.MovieWhereUniqueInput;
  }): Promise<Movie> {
    const { where } = params;

    const [deletedMovie, error] = await to(
      this.prisma.movie.delete({
        where,
      }),
    );
    if (error) throw new Error(String(error));

    return deletedMovie;
  }
}
