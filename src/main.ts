import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Varejo')
    .setDescription('API para gerenciar produtos, usuários, vendas e autenticação')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona suporte para autenticação via Bearer Token
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Interface Swagger disponível em /api

  await app.listen(3000);
}
bootstrap();
