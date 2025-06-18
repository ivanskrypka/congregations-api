import { ArgumentsHost, Catch, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ContextLogger } from 'nestjs-context-logger';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter extends BaseExceptionFilter<UnauthorizedException> {
  private readonly logger = new ContextLogger(UnauthorizedExceptionFilter.name);

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const ip = request.ip;
    this.logger.error(
      `Unauthorized exception: IP ${ip}, message: ${exception.message}`,
    );
    super.catch(exception, host);
  }
}
