import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConfig } from 'src/config/jwt';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      // asi debería estar en el body
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  // payload is the object that was passed to the jwt.sign() method
  async validate(payload: any) {
    const { id, name, email, number, role } = payload;
    //Esto es lo que tendremos en req.user o @user() en los controladores
    return { id, name, email, number, role };
  }
}
