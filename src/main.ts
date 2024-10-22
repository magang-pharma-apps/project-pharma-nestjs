import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.enableCors({
    origin: 'http://localhost:5000',
    methods: 'GET, HEAD, POST, PUT, DELETE, PATCH',
    credentials: true,
  })
  // Setup validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // auto transform payloads coming from network to be objects typed according to DTO classes
      forbidUnknownValues: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Inventory Pharmacy App')
    .setDescription('Dokumentasi API menggunakan Nest JS')
    .addBearerAuth(
      {
        description: 'Masukkan token JWT',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'accessToken',
    )
    .setVersion('1.0')
    .addTag('Inventory Pharmacy App')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
