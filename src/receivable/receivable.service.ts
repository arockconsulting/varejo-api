import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Receivable } from '../infra/entities/receivable.schema';
import { CreateReceivableDto } from './dtos/create-receivable.dto';

@Injectable()
export class ReceivableService {
  constructor(
    @InjectModel(Receivable.name) private receivableModel: Model<Receivable>,
  ) {}

  async create(createReceivableDto: CreateReceivableDto): Promise<Receivable> {
    const createdReceivable = new this.receivableModel(createReceivableDto);
    return createdReceivable.save();
  }

  async findAll(): Promise<Receivable[]> {
    return this.receivableModel
      .find()
      .populate('order')
      .populate('client')
      .populate('paymentMethod')
      .exec();
  }

  async findOne(id: string): Promise<Receivable> {
    const receivable = await this.receivableModel
      .findById(id)
      .populate('order')
      .populate('client')
      .populate('paymentMethod')
      .exec();
    if (!receivable) {
      throw new NotFoundException(`Receivable with ID "${id}" not found`);
    }
    return receivable;
  }

  async update(
    id: string,
    updateReceivableDto: Partial<Receivable>,
  ): Promise<Receivable> {
    const updatedReceivable = await this.receivableModel
      .findByIdAndUpdate(id, updateReceivableDto, { new: true })
      .populate('order')
      .populate('client')
      .populate('paymentMethod')
      .exec();
    if (!updatedReceivable) {
      throw new NotFoundException(`Receivable with ID "${id}" not found`);
    }
    return updatedReceivable;
  }

  async remove(id: string): Promise<void> {
    const result = await this.receivableModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Receivable with ID "${id}" not found`);
    }
  }
}
