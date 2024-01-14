import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('jwt-refresh') {
  //Para que el filtro tenga información control sobre el error que se lanza
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw (
        new UnauthorizedException(
          `Error en la estrategia local, validando un JWT de refresh:
           Información: ${info?.message},
           Error: ${err}`,
        ) || err
      );
    }
    return user;
  }
}
