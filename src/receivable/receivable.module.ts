import { ReceivableController } from './receivable.controller';
import { ReceivableService } from './receivable.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from 'src/client/client.module';
import {
  Receivable,
  ReceivableSchema,
} from '../infra/entities/receivable.schema';
import { OrderModule } from 'src/order/order.module';
import { PaymentMethodModule } from 'src/paymentMethod/payment-method.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Receivable.name, schema: ReceivableSchema },
    ]),
    forwardRef(() => OrderModule), // Usando forwardRef
    ClientModule,
    PaymentMethodModule,
  ],
  controllers: [ReceivableController],
  providers: [ReceivableService],
  exports: [ReceivableService],
})
export class ReceivableModule {}
