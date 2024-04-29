import { Module } from "@nestjs/common";
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from "./cron.service";
import { DataExtractionModule } from "../data-extraction/data-extraction.module";
import { AlertingModule } from "../alerting/alerting.module";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [  
        DataExtractionModule,
        ScheduleModule.forRoot(),
        AlertingModule,
        ConfigModule
    ],
    controllers: [],
    providers: [CronService],
    exports: [CronService]
})
export class CronModule { }
