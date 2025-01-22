import { ContasapagarController } from './finance/contasapagar.controller';
import { NfeEntradaService } from './nfe/nfeentrada.service';
import { SefazModule } from './sefaz/sefaz.module';
import { CertificadoService } from './nfe/certificado.service';
import { ReceivableModule } from './receivable/receivable.module';
import { ClientModule } from './client/client.module';
import { FinanceModule } from './finance/finance.module';
import { GroupsModule } from './groups/groups.module';
import { NfeModule } from './nfe/nfe.module';
import { OrderModule } from './order/order.module';
import { PaymentMethodModule } from './paymentMethod/payment-method.module';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SefazModule,
    ReceivableModule,
    PaymentMethodModule,
    ClientModule,
    OrderModule,
    GroupsModule,
    NfeModule,
    FinanceModule,
    FornecedorModule,
    UserModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [CertificadoService, AppService],
})
export class AppModule {}
