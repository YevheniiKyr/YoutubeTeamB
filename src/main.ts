import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DataSource } from 'typeorm';
import { Channel } from './entities/Channel';
import { Comment } from './entities/Comment';
import { Video } from './entities/Video';

async function insertChannel() {
  const dataSource = new DataSource({
    //@ts-ignore
    type: 'mysql',
    host: 'youtube-data.cpkc6iime28n.ap-south-1.rds.amazonaws.com',
    // @ts-ignore
    port: 3306,
    username: 'admin',
    password: 'Makkovaothers',
    database: 'youtube',
    entities: [Channel, Comment, Video],
    synchronize: false,
    logging: false,
  });
  await dataSource.initialize();

  // eslint-disable-next-line prettier/prettier
  const comment = new Comment();
  comment.id = 'parentComment1';
  comment.textDisplay = 'This is the parent comment';
  comment.likeCount = 10;
  comment.publishedAt = new Date('2023-01-02T12:00:00.000Z');
  comment.updatedAt = new Date('2023-01-02T12:00:00.000Z');
  comment.parentId = null; // It's a parent comment, so no parentId
  comment.videoId = null;

  const res = await dataSource.manager.save(comment);
  console.log('Res saved', res.id);
}
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  await insertChannel();
  // await app.listen(3000);
}
bootstrap();
