import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export class ResponseFormatter {
  constructor(
    public data: any = null,
    public message: string,
    public statusCode: number = HttpStatus.OK,
  ) {}

  formatError(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    this.data = null;
    this.message = message;
    this.statusCode = statusCode;
    return this;
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      data: this.data,
    };
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse().toString()
        : 'Internal server error';

    const formattedResponse = new ResponseFormatter(
      null,
      message,
      status,
    ).formatError(message, status);

    response.status(status).json(formattedResponse);
  }
}
