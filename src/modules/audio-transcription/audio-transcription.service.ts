import { Injectable } from '@nestjs/common';
import * as Deepgram from '@deepgram/sdk';
import { DeepgramClient } from '@deepgram/sdk';
import { deepgramConfig } from 'src/configs/deepgram.config';
import * as ytdl from 'ytdl-core';

@Injectable()
export class AudioTranscriptionService {
    private readonly deepgram: DeepgramClient;

    constructor() {
        this.deepgram = Deepgram.createClient(deepgramConfig.apiKey);


    }

    private downloadVideo(url: string) {
        return new Promise((resolve, reject) => {
            try {
                const audioReadableStream = ytdl(url, { filter: 'audioonly' });
                
                const audioBuffer = [];

                audioReadableStream.on('data', (chunk) => {
                    audioBuffer.push(chunk);
                });

                audioReadableStream.on('end', () => {
                    const finalAudioBuffer = Buffer.concat(audioBuffer);
                    resolve(finalAudioBuffer);
                });

                audioReadableStream.on('error', (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async transcribeAudioByUrl(url: string, language: string) {
        const audioFile = await this.downloadVideo(url) as Buffer;

        const { result, error } = await this.deepgram.listen.prerecorded.transcribeFile(
            audioFile,
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