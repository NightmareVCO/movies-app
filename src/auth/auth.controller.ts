import { SingInDtoType } from './dto/create-auth.dto';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { singInSchema } from './dto/schema/base-singIn.schema';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jtw-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { to } from 'src/utils/to';
import { RefreshJwtAuthGuard } from './guard/refresh-jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(singInSchema))
  async login(@Body() singInDtoType: SingInDtoType) {
    const [token, error] = await to(this.authService.login(singInDtoType));
    if (error)
      throw new InternalServerErrorException(
        `Error logging in at controller: ${error}`,
      );

    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: any) {
    return user;
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@User() user: any) {
    const [refreshToken, error] = await to(this.authService.refreshToken(user));
    if (error)
      throw new InternalServerErrorException(
        `Error refreshing token at controller: ${error}`,
      );

    return refreshToken;
  }
}
