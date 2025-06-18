import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorator/public.decorator';

@Controller('static')
export class StaticController {
  constructor() {}

  @Public()
  @Get('timezones')
  async getTimezones(): Promise<string[]> {
    return Promise.resolve(Intl.supportedValuesOf('timeZone'));
  }
}
