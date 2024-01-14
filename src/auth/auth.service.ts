import { BcryptService } from './bcrypt/bcrypt.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { to } from 'src/utils/to';
import { SingInDtoType } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async login(singInDtoType: SingInDtoType) {
    const [user, userError] = await to(this.validate(singInDtoType));
    if (userError)
      throw new Error(`Error validating user at login/service: ${userError}`);
    if (!user) throw new Error('User not found at login/service');

    const [token, errorToken] = await to(this.generateAuthToken(user));
    if (errorToken)
      throw new Error(`Error generating token at login/service: ${errorToken}`);

    const [refreshToken, errorRefreshToken] = await to(
      this.generateRefreshToken(user),
    );
    if (errorRefreshToken)
      throw new Error(
        `Error generating refresh token at login/service: ${errorRefreshToken}`,
      );

    // localStorage.setItem('access_token', token);
    // localStorage.setItem('refresh_token', refreshToken);
    return { access_token: token, refresh_token: refreshToken };
  }

  async refreshToken(user: User) {
    const [token, errorToken] = await to(this.generateAuthToken(user));
    if (errorToken)
      throw new Error(`Error generating token at service: ${errorToken}`);

    return { access_token: token };
  }

  logout() {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('refresh_token');
    return { message: 'Logout success' };
  }

  async validate(params: { email: string; password: string }): Promise<User> {
    const { email, password } = params;
    const user = await this.usersService.findOneAndIsUser({
      where: { email: email },
    });
    if (!user)
      throw new Error('Invalid credentials at validate/service when user');

    const isPasswordValid = await this.bcryptService.checkPasswordMatch({
      inputPassword: password,
      userPassword: user.password,
    });
    if (!isPasswordValid)
      throw new Error('Invalid credentials at validate/service when password');

    return user;
  }

  generateAuthToken(user: User): Promise<string> {
    const { id, name, email, number, role } = user;

    // se manda a llamar el método validate del jwt.strategy.ts
    const payload = { id, name, email, number, role };
    return this.jwtService.signAsync(payload);
  }

  generateRefreshToken(user: User): Promise<string> {
    const { id, name, email, number, role } = user;

    // se manda a llamar el método validate del jwt.strategy.ts
    const payload = { id, name, email, number, role };
    return this.jwtService.signAsync(payload, { expiresIn: '16d' });
  }
}
// jwt: pnpm install --save @nestjs/jwt

// get an environment variable
// const dbUser = this.configService.get<string>('DATABASE_USER');
