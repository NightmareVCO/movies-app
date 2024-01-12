import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  InternalServerErrorException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import { createUserSchema } from './dto/schema/base-user.schema';
import { to } from 'src/utils/to';
import { findMovieByIdSchema } from 'src/movies/dto/schema/base-movieId.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    const [createdUser, error] = await to(
      this.usersService.create({ data: createUserDto }),
    );
    if (error)
      throw new InternalServerErrorException(error, 'Error creating user');

    return createdUser;
  }

  @Get()
  async findAll() {
    const [users, error] = await to(this.usersService.findAll({}));
    if (error)
      throw new InternalServerErrorException(error, 'Error getting users');

    return users;
  }

  @Get(':id')
  @UsePipes(new ParseUUIDPipe())
  async findOne(@Param('id') id: string) {
    const [user, error] = await to(
      this.usersService.findOne({
        where: { id: String(id) },
      }),
    );
    if (error)
      throw new InternalServerErrorException(error, 'Error getting user');

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const [updatedUser, error] = await to(
      this.usersService.update({
        where: { id: String(id) },
        data: updateUserDto,
      }),
    );
    if (error)
      throw new InternalServerErrorException(error, 'Error updating user');

    return updatedUser;
  }

  @Delete(':id')
  @UsePipes(new ParseUUIDPipe())
  async remove(@Param('id') id: string) {
    const [deletedUser, error] = await to(
      this.usersService.remove({
        where: { id: String(id) },
      }),
    );
    if (error)
      throw new InternalServerErrorException(error, 'Error deleting user');

    return deletedUser;
  }

  @Post(':id/movies')
  @UsePipes()
  async addMovie(
    @Body(new ZodValidationPipe(findMovieByIdSchema)) body: { movieId: string },
    @Param('id', new ParseUUIDPipe()) userId: string,
  ) {
    const { movieId } = body;

    const [favoritesUserMovies, error] = await to(
      this.usersService.addMovie({
        where: { id: String(userId) },
        data: { favorites: { connect: { id: String(movieId) } } },
        include: { favorites: true },
      }),
    );
    if (error)
      throw new InternalServerErrorException(error, 'Error adding movie');

    return favoritesUserMovies;
  }

  //get all movies from a user
  @Get(':id/movies')
  @UsePipes(new ParseUUIDPipe())
  async getMovies(@Param('id') id: string) {
    const [favoritesUserMovies, error] = await to(
      this.usersService.findOne({
        where: { id: String(id) },
        include: { favorites: true },
      }),
    );
    if (error)
      throw new InternalServerErrorException(error, 'Error getting user');

    return favoritesUserMovies;
  }
}
