import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import { createMovieSchema } from './dto/schema/base-movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { to } from 'src/utils/to';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  // get all movies
  @Get()
  async findAll() {
    const [movies, error] = await to(this.movieService.findAll({}));
    if (error)
      throw new InternalServerErrorException(error, 'Error getting movies');

    return movies;
  }

  // get one movie by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const [movie, error] = await to(
      this.movieService.findOne({
        id: String(id),
      }),
    );
    if (error)
      throw new InternalServerErrorException(error, 'Error getting movie');

    return movie;
  }

  // create a movie
  @Post()
  @UsePipes(new ZodValidationPipe(createMovieSchema))
  async create(@Body() createMovieDto: CreateMovieDto) {
    const [createdMovie, error] = await to(
      this.movieService.create(createMovieDto),
    );
    if (error)
      throw new InternalServerErrorException(error, 'Error creating movie');

    return createdMovie;
  }
}

// @Post("user")
// async signupUser(
// 	@Body() userData: { name?: string; email: string }
// ): Promise<UserModel> {
// 	return this.userService.createUser(userData);
// }
