import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const jwtConfig = {
  // global: true,
  secret: configService.get<string>('JWT_KEY') || process.env.JWT_SECRET,
  signOptions: { expiresIn: '1000s' },
};
