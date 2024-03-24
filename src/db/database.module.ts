import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "src/configs/database.config";
import { ChannelRepository } from "./repositories/channel.repository";
import { CommentRepository } from "./repositories/comment.repository";
import { VideoRepository } from "./repositories/video.repository";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => ({
                type: 'mysql',
                host: databaseConfig.host || '127.0.0.1',
                port: databaseConfig.port || 3306,
                username: databaseConfig.username || 'admin',
                password: databaseConfig.password || 'admin',
                database: databaseConfig.database ||'youtube',
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                synchronize: false,
                logging: false,
                autoLoadEntities: false,
            }),
          }),
    ],
    controllers: [],
    providers: [
      CommentRepository,
      ChannelRepository,
      VideoRepository
    ],
    exports: [
      CommentRepository,
      ChannelRepository,
      VideoRepository
    ]  
})
export class DatabaseModule {}