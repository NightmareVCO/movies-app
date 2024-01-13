import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    //importante que se llame super y que se le pase un objeto con los campos que se van a usar
    super({
      usernameField: 'email', // Indica que el campo de nombre de usuario será 'email'
      passwordField: 'password', // Indica que el campo de contraseña será 'password'
    });
  }

  // aquí debemos usar lo que estemos mandando en el body
  async validate(email: string, password: string): Promise<User> {
    return this.authService.validate({ email, password });
  }
}
