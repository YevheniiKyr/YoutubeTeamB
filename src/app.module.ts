import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataExtractionModule } from './modules/data-extraction/data-extraction.module';
import { DatabaseModule } from './db/database.module';
import { AudioTranscriptionModule } from './modules/audio-transcription/audio-transcription.module';
import { CronModule } from './modules/cron/cron.module';
import { ChannelModule } from './modules/channel/channel.module';

@Module({
  imports: [
    CronModule,
    DatabaseModule,
    DataExtractionModule,
    AudioTranscriptionModule,
    ChannelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
