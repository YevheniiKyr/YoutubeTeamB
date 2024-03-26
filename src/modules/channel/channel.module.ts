import { Module } from '@nestjs/common';
import { DataExtractionModule } from '../data-extraction/data-extraction.module';

@Module({
  imports: [DataExtractionModule],
  controllers: [],
  providers: [],
})
export class ChannelModule {}
