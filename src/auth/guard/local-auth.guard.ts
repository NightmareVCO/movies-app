import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  //Para que el filtro tenga información control sobre el error que se lanza
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw (
        new UnauthorizedException(
          `Error en la estrategia local, creando un JWT:
           Información: ${info?.message},
           Error: ${err}`,
        ) || err
      );
    }
    return user;
  }
}
