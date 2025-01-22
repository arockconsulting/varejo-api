import { NfeService } from './nfe.service';
import { ProductsModule } from 'src/products/products.module';
import { NfeController } from './nfe.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FinanceModule } from 'src/finance/finance.module';
import { FornecedorModule } from 'src/fornecedor/fornecedor.module';
import { UserModule } from 'src/user/user.module';
import { ClientModule } from 'src/client/client.module';
import { OrderModule } from 'src/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Nfe, NfeSchema } from '../infra/entities/nfe.schema';
import { CertificadoService } from './certificado.service';
import {
  NfeEntrada,
  NfeEntradaSchema,
} from '../infra/entities/nfeEntrada.schema';
import { NfeEntradaService } from './nfeentrada.service';

@Module({
  imports: [
    ProductsModule,
    FornecedorModule,
    FinanceModule,
    MongooseModule.forFeature([
      { name: Nfe.name, schema: NfeSchema },
      { name: NfeEntrada.name, schema: NfeEntradaSchema },
    ]),
    OrderModule,
    ClientModule,
    UserModule,
  ],
  controllers: [NfeController],
  providers: [NfeService, CertificadoService, NfeEntradaService],
})
export class NfeModule {}
