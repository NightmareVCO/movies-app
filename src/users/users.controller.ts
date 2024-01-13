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
      throw new InternalServerErrorException(
        `Error creating user at controller: ${error}`,
      );
    if (createdUser.password) createdUser.password = 'null';
    return createdUser;
  }

  @Get()
  async findAll() {
    const [users, error] = await to(this.usersService.findAll({}));
    if (error)
      throw new InternalServerErrorException(
        `Error getting users at controller: ${error}`,
      );

    users.forEach((user) => {
      if (user.password) user.password = 'null';
    });
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
      throw new InternalServerErrorException(
        `Error getting user by id at controller: ${id}: ${error}`,
      );
    if (user)
      if (this.usersService.isUser(user))
        if (user.password) user.password = 'null';

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
      throw new InternalServerErrorException(
        `Error updating user at controller: ${error}`,
      );

    if (updatedUser.password) updatedUser.password = 'null';
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
      throw new InternalServerErrorException(`Error deleting user: ${error}`);

    if (deletedUser.password) deletedUser.password = 'null';
    return deletedUser;
  }

  @Post(':userId/movies/:movieId')
  @UsePipes()
  async addFavoriteMovie(
    @Param('movieId', new ParseUUIDPipe()) movieId: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    const [addedMovies, error] = await to(
      this.usersService.addFavoriteMovie({
        where: { id: String(userId) },
        data: { favorites: { connect: { id: String(movieId) } } },
      }),
    );
    if (error)
      throw new InternalServerErrorException(
        `Error adding movie to user at controller: ${error}`,
      );

    return addedMovies.favorites[addedMovies.favorites.length - 1];
  }

  //get all movies from a user
  @Get(':id/movies')
  @UsePipes(new ParseUUIDPipe())
  async getFavoritesMovies(@Param('id') id: string) {
    const [favoritesMovies, error] = await to(
      this.usersService.findOne({
        where: { id: String(id) },
        include: { favorites: true },
      }),
    );
    if (error)
      throw new InternalServerErrorException(
        `Error getting favorites movies at controller: ${error}`,
      );

    return favoritesMovies;
  }
}
