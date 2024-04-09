import { Module } from '@nestjs/common';

import { DataExtractionService } from './data-extraction.service';
import { DatabaseModule } from 'src/db/database.module';
import { AudioTranscriptionModule } from '../audio-transcription/audio-transcription.module';

@Module({
  imports: [
    DatabaseModule, 
    AudioTranscriptionModule
  ],
  controllers: [],
  providers: [
    DataExtractionService,
  ],
  exports: [
    DataExtractionService
  ]
})
export class DataExtractionModule {}
