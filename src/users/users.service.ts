import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { to } from 'src/utils/to';
import { UserMoviesInfo } from './dto/type/user-movie.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;

    const [createdUser, error] = await to(
      this.prisma.user.create({
        data,
      }),
    );
    if (error) throw new Error(String(error));

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
    if (error) throw new Error(String(error));

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
    if (error) throw new Error(String(error));
    if (!user) return null;

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
    if (error) throw new Error(String(error));

    return updatedUser;
  }

  async remove(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params;

    const [deletedUser, error] = await to(
      this.prisma.user.delete({
        where,
      }),
    );
    if (error) throw new Error(String(error));

    return deletedUser;
  }

  async addMovie(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
    include?: Prisma.UserInclude;
  }): Promise<UserMoviesInfo> {
    const { where, data } = params;

    const [updatedUser, error] = await to(
      this.prisma.user.update({
        data,
        where,
        include: { favorites: true },
      }),
    );
    if (error) throw new Error(String(error));

    return { favorites: updatedUser.favorites };
  }
}
