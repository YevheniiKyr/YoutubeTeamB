import { Controller, Get } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export default class CronController {
  constructor(private readonly cronService: CronService) {}
  @Get('/')
  async makeCronJob() {
    return this.cronService.handleCron();
  }
}
