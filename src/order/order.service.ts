/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientService } from 'src/client/client.service';
import { Order } from 'src/infra/entities/order.schema';
import { PaymentMethodService } from 'src/paymentMethod/payment-method.service';
import { CreateReceivableDto } from 'src/receivable/dtos/create-receivable.dto';
import { ReceivableService } from 'src/receivable/receivable.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private receivableService: ReceivableService,
    private paymentMethodService: PaymentMethodService,
    private clientService: ClientService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel({
      ...createOrderDto,
      total: createOrderDto.items.reduce((acc, item) => acc + (item.price * item.quantity - (item.discount || 0)), 0) - (createOrderDto.totalDiscount || 0)
  });
    const savedOrder = await createdOrder.save();

    if (createOrderDto.paymentMethod) {
      await this.createReceivables(savedOrder);
    }

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
      return this.orderModel
          .find()
          .populate('client')
          .populate('seller')
          .populate('items.product')
          .populate('paymentMethod')
          .exec();
  }

  async findOne(id: string): Promise<Order> {
      const order = await this.orderModel
          .findById(id)
          .populate('client')
          .populate('seller')
          .populate('items.product')
          .populate('paymentMethod')
          .exec();
      if (!order) {
          throw new NotFoundException(`Order with ID "${id}" not found`);
      }
      return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
      const updatedOrder = await this.orderModel
          .findByIdAndUpdate(id, updateOrderDto, { new: true })
          .populate('client')
          .populate('seller')
          .populate('items.product')
          .populate('paymentMethod')
          .exec();
      if (!updatedOrder) {
          throw new NotFoundException(`Order with ID "${id}" not found`);
      }
      return updatedOrder;
  }

  async remove(id: string): Promise<void> {
      const result = await this.orderModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
          throw new NotFoundException(`Order with ID "${id}" not found`);
      }
  }

  private async createReceivables(order: Order) {
      const paymentMethod = await this.paymentMethodService.findOne(
          order.paymentMethod.toString(),
      );
      const client = await this.clientService.findOne(order.client.toString());

      if (!paymentMethod) {
          throw new NotFoundException(
              `Payment method with ID "${order.paymentMethod}" not found`,
          );
      }

      if (!client) {
          throw new NotFoundException(`Client with ID "${order.client}" not found`);
      }

      if (paymentMethod.isInstallment) {
          const amountPerInstallment = (order.total / (order.installments || 1));
          const today = new Date();

          for (let i = 0; i < (order.installments || 1); i++) {
              const dueDate = new Date(today);
              dueDate.setMonth(today.getMonth() + i + 1);

              const createReceivableDto: CreateReceivableDto = {
                  order: order._id.toString(), // Convertendo para string
                  client: client._id.toString(), // Convertendo para string
                  paymentMethod: paymentMethod._id.toString(), // Convertendo para string
                  amount: amountPerInstallment,
                  dueDate: dueDate,
              };

              await this.receivableService.create(createReceivableDto);
          }
      } else {
          const createReceivableDto: CreateReceivableDto = {
              order: order._id.toString(), // Convertendo para string
              client: client._id.toString(), // Convertendo para string
              paymentMethod: paymentMethod._id.toString(), // Convertendo para string
              amount: order.total,
              dueDate: new Date(),
          };

          await this.receivableService.create(createReceivableDto);
      }
  }
}
