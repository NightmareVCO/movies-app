import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConfig } from 'src/config/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
