import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import *as cookieParser from 'cookie-parser';
import { ConfigService } from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';


async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin:'http://localhost:3000',
     //origin: '*',
     methods: ['GET', 'POST','PUT','DELETE', 'PATCH','HEAD'],
     credentials: true,
     allowedHeaders: 'Content-Type, Authorization',
    // allowedHeaders: ['Content-Type', 'Authorization']
   });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    forbidNonWhitelisted:true,
    transformOptions:{
    enableImplicitConversion:true,
    }
  }));

  // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  //   prefix: '/uploads/',
  // });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL prefix for accessing images
  });

  const options = new DocumentBuilder()
    .setTitle('Niyo Task-Management-System')
    .setDescription('Niyo TMS')
    .setVersion('1.0')
    .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  const PORT = +configService.get<number>("PORT")||3008;

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(PORT);
}
bootstrap();
