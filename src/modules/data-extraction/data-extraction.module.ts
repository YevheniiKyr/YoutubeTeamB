import { Module } from '@nestjs/common';

import { DataExtractionService } from './data-extraction.service';
import { DatabaseModule } from 'src/db/database.module';
import { AudioTranscriptionModule } from '../audio-transcription/audio-transcription.module';
import { AlertingModule } from '../alerting/alerting.module';
import { DataExtractionController } from './data-extraction.controller';

@Module({
  imports: [DatabaseModule, AudioTranscriptionModule, AlertingModule],
  controllers: [DataExtractionController],
  providers: [DataExtractionService],
  exports: [DataExtractionService],
})
export class DataExtractionModule {}
