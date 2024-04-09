import { NestFactory } from '@nestjs/core';
import { ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { AlertStatusEnum, AlertingService } from './modules/alerting/alerting.service';

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

  await app.listen(port);

  app.get(AlertingService).alert('Hello', AlertStatusEnum.info)
}

void bootstrap();
