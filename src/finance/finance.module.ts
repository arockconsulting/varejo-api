/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ContasAPagar,
  ContasAPagarSchema,
} from 'src/infra/entities/contasAPagar.schema';
import { ContasAPagarService } from './contasapagar.service';
import { ContasapagarController } from './contasapagar.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContasAPagar.name, schema: ContasAPagarSchema },
    ]),
  ],
  controllers: [ContasapagarController],
  providers: [ContasAPagarService],
  exports: [ContasAPagarService],
})
export class FinanceModule {}
