import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';
const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(port, '0.0.0.0');
  app.disable('x-powered-by');
  app.enableCors();
  app.use(helmet());

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

// pnpm i --save helmet
