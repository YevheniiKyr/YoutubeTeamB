import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommentRepository } from './db/repositories/comment.repository';
import { DataExtractionService } from './modules/data-extraction/data-extraction.service';
import { VideoRepository } from './db/repositories/video.repository';
import { ChannelRepository } from './db/repositories/channel.repository';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(CommentRepository).count().then(console.log);
  app.get(DataExtractionService).saveYoutubeDataToDBByDateRange(new Date('2024-03-21T10:00:26.000Z'), new Date(Date.now())).then(console.log);

  await app.listen(3000);
}
bootstrap();
