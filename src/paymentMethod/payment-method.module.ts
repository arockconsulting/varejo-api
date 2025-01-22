import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethodController } from './payment-method.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import {
  PaymentMethod,
  PaymentMethodSchema,
} from '../infra/entities/payment-method.schema';
import { PaymentMethodService } from './payment-method.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
    ]),
  ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
