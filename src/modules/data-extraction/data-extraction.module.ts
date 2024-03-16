import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataExtractionService } from './data-extraction.service';
import { ChannelRepository } from 'src/db/repositories/channel.repository';
import { CommentRepository } from 'src/db/repositories/comment.repository';
import { VideoRepository } from 'src/db/repositories/video.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    CommentRepository,
    ChannelRepository,
    VideoRepository
  ])],
  controllers: [],
  providers: [DataExtractionService],
})
export class DataExtractionModule {}
