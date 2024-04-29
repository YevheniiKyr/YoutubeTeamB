import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { ChannelRepository } from './repositories/channel.repository';
import { CommentRepository } from './repositories/comment.repository';
import { VideoRepository } from './repositories/video.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('database.host') || '127.0.0.1',
        port: configService.get<number>('database.port') || 3306,
        username: configService.get<string>('database.username') || 'admin',
        password: configService.get<string>('database.password') || 'admin',
        database:
          configService.get<string>('database.databaseName') || 'youtube',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: false,
        logging: false,
        autoLoadEntities: false,
        connectionTimeout: 15 * 60 * 1000,
        requestTimeout: 15 * 60 * 1000,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [CommentRepository, ChannelRepository, VideoRepository],
  exports: [CommentRepository, ChannelRepository, VideoRepository],
})
export class DatabaseModule {}
