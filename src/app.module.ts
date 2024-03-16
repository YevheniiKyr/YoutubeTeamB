import { Module } from '@nestjs/common';
import { initAppModules } from './init/init-app.modules';
import { CommentRepository } from './db/repositories/comment.repository';
import { ChannelRepository } from './db/repositories/channel.repository';
import { VideoRepository } from './db/repositories/video.repository';

@Module({
  imports: [...initAppModules],
  controllers: [],
  providers: [
    CommentRepository,
    ChannelRepository,
    VideoRepository
  ],
})
export class AppModule {}
