import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Deepgram from '@deepgram/sdk';
import { DeepgramClient } from '@deepgram/sdk';

@Injectable()
export class AudioTranscriptionService {
  private readonly deepgram: DeepgramClient;

  constructor(private readonly configService: ConfigService) {
    this.deepgram = Deepgram.createClient(
      this.configService.get<string>('deepgram.apiKey'),
    );
  }

  async transcribeAudioByUrl(url: string, language: string) {
    console.log(url);
    const { result, error } =
      await this.deepgram.listen.prerecorded.transcribeUrl(
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
