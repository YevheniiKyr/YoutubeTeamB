import { Injectable } from "@nestjs/common";
import * as Deepgram from '@deepgram/sdk';
import { DeepgramClient } from '@deepgram/sdk';
import { deepgramConfig } from "src/configs/deepgram.config";

@Injectable()
export class AudioTranscriptionService {
    private readonly deepgram: DeepgramClient;

    constructor() {
        this.deepgram = Deepgram.createClient(deepgramConfig.apiKey);
    }

    async transcribeAudioByUrl(url: string, language: string) {
        const { result, error } = await this.deepgram.listen.prerecorded.transcribeUrl(
            { url },
            {
                model: 'nova-2',
                language,
            },
        );

        if (error) {
            throw error;
        }

        return result?.results?.channels[0].alternatives[0]?.transcript;
    }
}