import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dtos/create-payment-method.dto';
import { PaymentMethod } from '../infra/entities/payment-method.schema';
import { UpdatePaymentMethodDto } from './dtos/update-payment-method.dto';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async create(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentMethod> {
    return this.paymentMethodService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.update(id, updatePaymentMethodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.paymentMethodService.remove(id);
  }
}
