import { Module } from "@nestjs/common";

import { AlertingService } from "./alerting.service";

@Module({
    imports: [],
    controllers: [],
    providers: [
        AlertingService,
    ],
    exports: [AlertingService]
})
export class AlertingModule { }
