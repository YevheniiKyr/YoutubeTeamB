import { NestFactory } from '@nestjs/core';
import { ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ChannelRepository } from './db/repositories/channel.repository';
import { DataExtractionService } from './modules/data-extraction/data-extraction.service';
import { VideoRepository } from './db/repositories/video.repository';
import ChannelController from './modules/channel/channel.controller';
import {
  AlertStatusEnum,
  AlertingService,
} from './modules/alerting/alerting.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>('APP_PORT');
  const validationPipeConfig = configService.get<ValidationPipeOptions>(
    'validationPipe',
    { infer: true },
  );

  app.useGlobalPipes(validationPipeConfig);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().build(),
  );
  const customOptions = {
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  };

  SwaggerModule.setup('api', app, document, customOptions);

  app.get(AlertingService).alert('Service started', AlertStatusEnum.info);
  app.enableCors();
  await app.listen(port);
}

void bootstrap();
