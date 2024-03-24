import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataExtractionService } from './data-extraction.service';
import { ChannelRepository } from 'src/db/repositories/channel.repository';
import { CommentRepository } from 'src/db/repositories/comment.repository';
import { VideoRepository } from 'src/db/repositories/video.repository';
import { CommentEntity } from 'src/db/entities/comment.entity';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    DataExtractionService,
  ],
})
export class DataExtractionModule {}
