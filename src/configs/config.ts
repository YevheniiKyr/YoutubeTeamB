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
    cronSchedule: "0 21 * * * *",
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
        defaultLanguage: "UA",
      },
      {
        name: '@whiteguard_ua',
        id: 'UCV6AsXIRnrsBVEjAcFDO6SA',
        defaultLanguage: "UA",
      },
      {
        name: '@intimeUkraine',
        id: 'UCL7Vqph7xNpidbgjmfxpNyg',
        defaultLanguage: "UA",
      },
      {
        name: '@dailymail',
        id: 'UCw3fku0sH3qA3c3pZeJwdAw',
        defaultLanguage: "GB",
      },
      {
        name: '@ABCNews',
        id: 'UCBi2mrWuNuyYy4gbM6fU18Q',
        defaultLanguage: "GB",
      },
      {
        name: '@thesun',
        id: 'UCIzXayRP7-P0ANpq-nD-h5g',
        defaultLanguage: "GB",
      },
      {
        name: '@Max_Katz',
        id: 'UCUGfDbfRIx51kJGGHIFo8Rw',
        defaultLanguage: "RU",
      },
      {
        name: '@Agit_Prop',
        id: 'UC2qoLqo8RuV4P_88yhHCZIg',
        defaultLanguage: "RU",
      },
      {
        name: '@RTVINews',
        id: 'UCPU28A9z_ka_R5dQfecHJlA',
        defaultLanguage: "RU",
      },
      {
        name: '@RFU',
        id: 'UCcNB1tZYpeDetqCadElv9Ow',
        defaultLanguage: "GB",
      },
      {
        name: '@DJI',
        id: 'UCsNGtpqGsyw0U6qEG-WHadA',
        defaultLanguage: "GB",
      }



    ],
  },
  telegram: {
    apiToken: process.env.TELEGRAM_API,
    alertingChat: 421142242

  }
});
