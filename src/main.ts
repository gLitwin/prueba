import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerService, Module } from '@nestjs/common';

export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {}

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose']
    //logger: new MyLogger()
  });

  app.enableCors()
  await app.listen(process.env.APP_PORT);
  const logger = new Logger('MAIN');
  logger.verbose('HTTP Web Server Running: '+ await app.getUrl());
 // console.log(await app.getUrl());
  
}
bootstrap();
