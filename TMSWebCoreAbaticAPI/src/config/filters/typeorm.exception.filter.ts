import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const { url } = request;
    const { name } = exception;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      message: name,
    };
    response.status(HttpStatus.CONFLICT).json(errorResponse);
  }
}