import { Module } from "@nestjs/common";
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from "./cron.service";
import { DataExtractionModule } from "../data-extraction/data-extraction.module";
import { AlertingModule } from "../alerting/alerting.module";
import CronController from "./cron.controller";


@Module({
    imports: [  
        DataExtractionModule,
        ScheduleModule.forRoot(),
        AlertingModule
    ],
    controllers: [CronController],
    providers: [CronService],
    exports: [CronService]
})
export class CronModule { }
