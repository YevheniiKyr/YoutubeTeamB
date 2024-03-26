import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "src/configs/database.config";

export const initAppModules = [
    TypeOrmModule.forRootAsync({
        useFactory: async () => ({
            type: 'mysql',
            host: databaseConfig.host || '127.0.0.1',
            port: databaseConfig.port || 3306,
            username: databaseConfig.username || 'admin',
            password: databaseConfig.password || 'admin',
            database: databaseConfig.database || 'youtube',
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: false,
            logging: false,
            autoLoadEntities: false,
        }),
    }),
]