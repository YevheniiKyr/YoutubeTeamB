import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const initAppModules = [
  TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('database.host') || '127.0.0.1',
      port: configService.get<number>('database.port') || 3306,
      username: configService.get<string>('database.username') || 'admin',
      password: configService.get<string>('database.password') || 'admin',
      database: configService.get<string>('database.databaseName') || 'youtube',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: false,
      logging: false,
      autoLoadEntities: false,
    }),
    inject: [ConfigService],
  }),
];
