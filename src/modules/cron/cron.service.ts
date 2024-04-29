import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataExtractionService } from '../data-extraction/data-extraction.service';
import { AlertStatusEnum, AlertingService } from '../alerting/alerting.service';
import { appConfig } from 'src/configs/config';

@Injectable()
export class CronService {
  public constructor(private dataExtractionService: DataExtractionService, private alertingService: AlertingService) {}
  
  @Cron(appConfig().cron.cronSchedule)
  handleCron() {
    const currentDate = Date.now();
    const lastUpdate = Date.now() - 24 * 60 * 60 * 1000; 
    this.alertingService.alert(`initiating processing`, AlertStatusEnum.info);
    this.dataExtractionService.saveYoutubeDataToDBByDateRange(
      new Date(lastUpdate),
      new Date(currentDate),
    );
   
  }
}
