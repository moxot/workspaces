import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const globalPrefix = '/api';
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix(globalPrefix);

  const swaggerPath = `${globalPrefix}/swagger`;
  const config = new DocumentBuilder()
    .setTitle('test-workspace')
    .setDescription('API description')
    .setVersion('0.0.1')
    .addTag('API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addSecurityRequirements('access-token', [])
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        exposeUnsetFields: true,
      },
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      enableCircularCheck: true,
      enableImplicitConversion: true,
      exposeUnsetFields: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
