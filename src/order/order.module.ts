import { UserModule } from 'src/user/user.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../infra/entities/order.schema';
import { ClientModule } from 'src/client/client.module';
import { ReceivableModule } from 'src/receivable/receivable.module';
import { PaymentMethodModule } from 'src/paymentMethod/payment-method.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductsModule,
    PaymentMethodModule,
    UserModule,
    ClientModule,
    forwardRef(() => ReceivableModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
