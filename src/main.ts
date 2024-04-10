import { NestFactory } from '@nestjs/core';
import { ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ChannelRepository } from './db/repositories/channel.repository';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env);

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>('APP_PORT');
  const validationPipeConfig = configService.get<ValidationPipeOptions>(
    'validationPipe',
    { infer: true },
  );

  app.useGlobalPipes(validationPipeConfig);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, new DocumentBuilder().build());
  SwaggerModule.setup('api', app, document);

  app.get(ChannelRepository).find().then(console.log)
  
  app.enableCors();
  await app.listen(port);

}

void bootstrap();
