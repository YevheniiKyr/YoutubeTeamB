import { Module } from "@nestjs/common";

import { AudioTranscriptionService } from "./audio-transcription.service";

@Module({
    imports: [],
    controllers: [],
    providers: [
        AudioTranscriptionService,
    ],
    exports: [AudioTranscriptionService]
})
export class AudioTranscriptionModule { }
