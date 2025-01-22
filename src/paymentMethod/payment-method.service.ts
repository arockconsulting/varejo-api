import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentMethod } from 'src/infra/entities/payment-method.schema';
import { CreatePaymentMethodDto } from './dtos/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dtos/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private paymentMethodModel: Model<PaymentMethod>,
  ) {}

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const createdPaymentMethod = new this.paymentMethodModel(
      createPaymentMethodDto,
    );
    return createdPaymentMethod.save();
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodModel.find().exec();
  }

  async findOne(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodModel.findById(id).exec();
    if (!paymentMethod) {
      throw new NotFoundException(`PaymentMethod with ID "${id}" not found`);
    }
    return paymentMethod;
  }

  async update(
    id: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const updatedPaymentMethod = await this.paymentMethodModel
      .findByIdAndUpdate(id, updatePaymentMethodDto, { new: true })
      .exec();
    if (!updatedPaymentMethod) {
      throw new NotFoundException(`PaymentMethod with ID "${id}" not found`);
    }
    return updatedPaymentMethod;
  }

  async remove(id: string): Promise<void> {
    const result = await this.paymentMethodModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`PaymentMethod with ID "${id}" not found`);
    }
  }
}
