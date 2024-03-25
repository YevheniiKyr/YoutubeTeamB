import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AudioTranscriptionService } from "./audio-transcription.service";

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [
        AudioTranscriptionService,
    ],
    exports: [AudioTranscriptionService]
})
export class AudioTranscriptionModule { }
