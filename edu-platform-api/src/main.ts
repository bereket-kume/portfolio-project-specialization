import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
  const config = new DocumentBuilder()
    .setTitle("Backend Api")
    .setDescription("The backend API for the Community Platform")
    .setVersion('1.0')
    .addTag("API")
    .addBearerAuth({
      type: 'http', scheme: 'bearer', bearerFormat: 'JWT'
    },
    'JWT-auth'
  )
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
