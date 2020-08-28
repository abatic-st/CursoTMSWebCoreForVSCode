import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TypeORMExceptionFilter } from './config/filters/typeorm.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('NestJS Base API Example')
    .setDescription('This API is a generic system')
    .setVersion('1.0')
    .addTag('api')
    //.addBearerAuth({ type: 'http'})
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new TypeORMExceptionFilter());
  
  await app.listen(3000);
  

}
bootstrap();
