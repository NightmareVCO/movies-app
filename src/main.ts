import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(port, '0.0.0.0');
  app.disable('x-powered-by');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
