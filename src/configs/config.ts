import { HttpStatus } from '@nestjs/common';

import { AppConfig } from './interfaces';

export const appConfig = (): AppConfig => ({
  validationPipe: {
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    transform: true,
    validateCustomDecorators: true,
    stopAtFirstError: true,
    always: true,
    whitelist: true,
    transformOptions: {
      exposeUnsetFields: false,
      exposeDefaultValues: true,
    },
  },
  cron: {
    cronSchedule: process.env.CRON_SCHEDULE,
  },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE_NAME,
  },
  deepgram: {
    apiKey: process.env.DEEPGRAM_API_KEY,
  },
  youtube: {
    url: process.env.YOUTUBE_URL,
    apiUrl: process.env.YOUTUBE_API_URL,
    apiKey: process.env.YOUTUBE_API_KEY,
    channelsList: [
      {
        name: '@uttoronto',
        id: 'UCF_ZiWz2Vcq1o5u5i1TT3Kw',
      },
      {
        name: '@whiteguard_ua',
        id: 'UCV6AsXIRnrsBVEjAcFDO6SA',
      },
      {
        name: '@intimeUkraine',
        id: 'UCL7Vqph7xNpidbgjmfxpNyg',
      },
    ],
  },
});
