import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const res = exception.getResponse();
    if (typeof res === 'object') {
      if (
        status === HttpStatus.UNPROCESSABLE_ENTITY &&
        Array.isArray(res['message'])
      ) {
        res['message'] = res['message'].join('\n');
      }

      response.status(status).json({
        message: res['message'],
        errors: res['errors'],
        data: res['data'],
      });
    } else {
      response.status(status).json({ message: res });
    }
  }
}
