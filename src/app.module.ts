import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { initAppModules } from './init/init-app.modules';
import { CommentRepository } from './db/repositories/comment.repository';
import { ChannelRepository } from './db/repositories/channel.repository';
import { VideoRepository } from './db/repositories/video.repository';
import { DataExtractionModule } from './modules/data-extraction/data-extraction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './db/database.module';
import { AudioTranscriptionModule } from './modules/audio-transcription/audio-transcription.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    DataExtractionModule,
    AudioTranscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
