import { Module } from "@nestjs/common";
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from "./cron.service";
import { DataExtractionModule } from "../data-extraction/data-extraction.module";


@Module({
    imports: [  
        DataExtractionModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [],
    providers: [CronService],
    exports: [CronService]
})
export class CronModule { }
