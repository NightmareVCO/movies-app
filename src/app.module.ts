import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import configuration from './config/configuration';
import validation from './config/validation';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { UnauthorizedExceptionFilter } from './common/filters/unauthorized-exception.filter';
import { InternalServerErrorFilter } from './common/filters/internal-server-error.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validation,
    }),
    MoviesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter,
    },
  ],
})
export class AppModule {}
