import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataExtractionModule } from './modules/data-extraction/data-extraction.module';
import { DatabaseModule } from './db/database.module';
import { AudioTranscriptionModule } from './modules/audio-transcription/audio-transcription.module';
import { CronModule } from './modules/cron/cron.module';
import { ChannelModule } from './modules/channel/channel.module';
import { appConfig } from './configs/config';
import { AlertingModule } from './modules/alerting/alerting.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      cache: true,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'wwwroot'),
    //   serveRoot: '/api/wwwroot',
    // }),
    CronModule,
    DatabaseModule,
    DataExtractionModule,
    AudioTranscriptionModule,
    ChannelModule,
    AlertingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
