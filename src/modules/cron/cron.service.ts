import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataExtractionService } from '../data-extraction/data-extraction.service';

@Injectable()
export class CronService {
  public constructor(private dataExtractionService: DataExtractionService) {}

  @Cron(process.env.CRON_SCHEDULE)
  handleCron() {
    const currentDate = Date.now();
    const lastUpdate = Date.now() - 24 * 60 * 60 * 1000;
    this.dataExtractionService.saveYoutubeDataToDBByDateRange(
      new Date(lastUpdate),
      new Date(currentDate),
    );
  }
}
