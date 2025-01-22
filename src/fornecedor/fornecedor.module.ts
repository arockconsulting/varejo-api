import { FornecedorController } from './fornecedor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FornecedorService } from './fornecedor.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import {
  Fornecedor,
  FornecedorSchema,
} from 'src/infra/entities/fornecedor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Fornecedor.name, schema: FornecedorSchema },
    ]),
  ],
  controllers: [FornecedorController],
  providers: [FornecedorService],
  exports: [FornecedorService],
})
export class FornecedorModule {}
