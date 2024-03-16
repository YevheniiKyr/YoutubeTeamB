import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommentRepository } from './db/repositories/comment.repository';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(CommentRepository).count().then(console.log);

  await app.listen(3000);
}
bootstrap();
