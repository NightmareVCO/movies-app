import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { RefreshJwtStrategy } from './strategy/refreshToken.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register(jwtConfig),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [BcryptService],
})
export class AuthModule {}

// pnpm install --save @nestjs/passport passport passport-local
// pnpm install --save-dev @types/passport-local

// pnpm install --save @nestjs/jwt passport-jwt
// pnpm install --save-dev @types/passport-jwt
