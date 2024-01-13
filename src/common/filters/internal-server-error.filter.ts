import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';

@Catch(InternalServerErrorException)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal Server Error';

    if (request.body.password) delete request.body.password;

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: request.body,
    });
  }
}
