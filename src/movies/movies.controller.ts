import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateMovieDto, combinedSchema } from './dto/create-movie.dto';
import { to } from 'src/utils/to';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  // create a movie
  @Post()
  @UsePipes(new ZodValidationPipe(combinedSchema))
  async create(@Body() createMovieDto: CreateMovieDto) {
    const [createdMovie, error] = await to(
      this.movieService.create(createMovieDto),
    );
    if (error)
      throw new InternalServerErrorException(
        `Error creating movie at controller: ${error}`,
      );

    return this.findOne(createdMovie.id);
  }

  // get all movies
  @Get()
  async findAll() {
    const [movies, error] = await to(this.movieService.findAll({}));
    if (error)
      throw new InternalServerErrorException(
        error,
        'Error getting movies at controller',
      );

    return movies;
  }

  // get one movie by id
  @Get(':id')
  @UsePipes(new ParseUUIDPipe())
  async findOne(@Param('id') id: string) {
    const [movie, error] = await to(
      this.movieService.findOne({
        where: { id: String(id) },
      }),
    );
    if (error)
      throw new InternalServerErrorException(
        `Error getting movie at controller: ${error}`,
      );

    return movie;
  }

  // update a movie
  @Patch(':id')
  async update(
    @Body(new ZodValidationPipe(combinedSchema)) updateMovieDto: UpdateMovieDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const [updatedMovie, error] = await to(
      this.movieService.update(updateMovieDto, id),
    );
    if (error)
      throw new InternalServerErrorException(
        `Error updating movie at controller: ${error}`,
      );

    return this.findOne(updatedMovie.id);
  }

  // delete a movie
  @Delete(':id')
  @UsePipes(new ParseUUIDPipe())
  async remove(@Param('id') id: string) {
    const [deletedMovie, error] = await to(
      this.movieService.remove({
        where: { id: String(id) },
      }),
    );
    if (error)
      throw new InternalServerErrorException(
        `Error deleting movi at controller: ${error}`,
      );

    return deletedMovie;
  }
}

// @Post("user")
// async signupUser(
// 	@Body() userData: { name?: string; email: string }
// ): Promise<UserModel> {
// 	return this.userService.createUser(userData);
// }
