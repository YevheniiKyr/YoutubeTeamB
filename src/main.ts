import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommentRepository } from './db/repositories/comment.repository';
import { DataExtractionService } from './modules/data-extraction/data-extraction.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(DataExtractionService).saveYoutubeDataToDBByDateRange(new Date(), new Date()).then(console.log);

  await app.listen(3000);
}
bootstrap();
