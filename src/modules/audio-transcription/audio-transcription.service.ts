import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Deepgram from '@deepgram/sdk';
import { DeepgramClient } from '@deepgram/sdk';

@Injectable()
export class AudioTranscriptionService {
    private readonly deepgram: DeepgramClient;

    constructor(private configService: ConfigService) {
        this.deepgram = Deepgram.createClient(configService.get<string>('DEEPGRAM_API_KEY'));
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