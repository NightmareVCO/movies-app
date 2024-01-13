import { BcryptService } from './../auth/bcrypt/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { to } from 'src/utils/to';
import { UserMoviesInfo } from './dto/type/user-movie.type';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async create(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    const [hashedPassword, errorHashedPassword] = await to(
      this.bcryptService.createHashedPassword(data.password),
    );
    if (errorHashedPassword)
      throw new Error(
        `Error hashing password at service: ${String(errorHashedPassword)}`,
      );

    data.password = hashedPassword;
    const [createdUser, error] = await to(
      this.prisma.user.create({
        data,
      }),
    );
    if (error)
      throw new Error(`Error creating user at service: ${String(error)}`);

    return createdUser;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    const [users, error] = await to(
      this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    );
    if (error)
      throw new Error(`Error getting users at service: ${String(error)}`);

    return users;
  }

  async findOne(params: {
    where: Prisma.UserWhereUniqueInput;
    include?: Prisma.UserInclude;
  }): Promise<User | UserMoviesInfo | null> {
    const { where, include } = params;

    const [user, error] = await to(
      this.prisma.user.findUnique({ where, include: { favorites: true } }),
    );
    if (error)
      throw new Error(
        `Error finding user at service findOne: ${String(error)}`,
      );
    if (!user) throw new Error('User not found at service findOne');

    return include ? { favorites: user.favorites } : user;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    const [updatedUser, error] = await to(
      this.prisma.user.update({
        data,
        where,
      }),
    );
    if (error)
      throw new Error(`Error updating user at service: ${String(error)}`);

    return updatedUser;
  }

  async remove(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params;

    const [deletedUser, error] = await to(
      this.prisma.user.delete({
        where,
      }),
    );
    if (error)
      throw new Error(`Error deleting user at service: ${String(error)}`);

    return deletedUser;
  }

  async addFavoriteMovie(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserMoviesInfo> {
    const { where, data } = params;
    const [userFavoritesMovies, error] = await to(
      this.prisma.user.update({
        data,
        where,
        include: { favorites: true },
      }),
    );
    if (error) throw new Error(`Error adding movie: ${String(error)}`);

    return { favorites: userFavoritesMovies.favorites };
  }

  async findOneAndIsUser(params: {
    where: Prisma.UserWhereUniqueInput;
    include?: Prisma.UserInclude;
  }): Promise<User> {
    const { where, include } = params;
    const [user, error] = await to(this.findOne({ where, include }));
    if (error)
      throw new Error(`Error finding user at findOneIsUser: ${String(error)}`);
    if (!user) throw new Error('User not found at findOneIsUser/service');
    if (!this.isUser(user))
      throw new Error('User not valid type at findOneIsUser/service');

    return user;
  }

  isUser(user: User | UserMoviesInfo): user is User {
    if ('email' in user) return true;
    return false;
  }
}

// Para hashing de contraseñas: pnpm i bcrypt
// pnpm i -D @types/bcrypt
