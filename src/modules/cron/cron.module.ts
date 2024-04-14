import { Module } from "@nestjs/common";
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from "./cron.service";
import { DataExtractionModule } from "../data-extraction/data-extraction.module";
import { AlertingModule } from "../alerting/alerting.module";


@Module({
    imports: [  
        DataExtractionModule,
        ScheduleModule.forRoot(),
        AlertingModule
    ],
    controllers: [],
    providers: [CronService],
    exports: [CronService]
})
export class CronModule { }
