import { ValidationPipeOptions } from '@nestjs/common';

import { YoutubeChannel } from '../modules/data-extraction/interfaces';

interface CronConfig {
  cronSchedule: string;
}

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  databaseName: string;
}

interface DeepgramConfig {
  apiKey: string;
}

interface YoutubeConfig {
  url: string;
  apiUrl: string;
  apiKey: string;
  channelsList: YoutubeChannel[];
}

interface TelegramConfig {
  apiToken: string,
  alertingChat: number
}

interface AppConfig {
  validationPipe: ValidationPipeOptions;
  cron: CronConfig;
  database: DatabaseConfig;
  deepgram: DeepgramConfig;
  youtube: YoutubeConfig;
  telegram: TelegramConfig;
}

export { AppConfig, CronConfig, DatabaseConfig, DeepgramConfig, YoutubeConfig };
