import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContasAPagar } from 'src/infra/entities/contasAPagar.schema';
import {
  CreateContasAPagarDto,
  UpdateContasAPagarDto,
} from './dto/contas-a-pagar.dto';

@Injectable()
export class ContasAPagarService {
  constructor(
    @InjectModel(ContasAPagar.name)
    private contasAPagarModel: Model<ContasAPagar>,
  ) {}

  async create(
    createContasAPagarDto: CreateContasAPagarDto,
  ): Promise<ContasAPagar> {
    const contasAPagar = new this.contasAPagarModel(createContasAPagarDto);
    return contasAPagar.save();
  }

  async findAll(): Promise<ContasAPagar[]> {
    return this.contasAPagarModel.find().populate('fornecedorId').exec();
  }

  async findOne(id: string): Promise<ContasAPagar | null> {
    const contasAPagar = await this.contasAPagarModel
      .findById(id)
      .populate('fornecedorId')
      .exec();
    if (!contasAPagar) {
      throw new NotFoundException('Conta a pagar não encontrada');
    }
    return contasAPagar;
  }

  async update(
    id: string,
    updateContasAPagarDto: UpdateContasAPagarDto,
  ): Promise<ContasAPagar | null> {
    const contasAPagar = await this.contasAPagarModel
      .findByIdAndUpdate(id, updateContasAPagarDto, { new: true })
      .exec();
    if (!contasAPagar) {
      throw new NotFoundException('Conta a pagar não encontrada');
    }
    return contasAPagar;
  }

  async remove(id: string) {
    const contasAPagar = await this.contasAPagarModel
      .findByIdAndDelete(id)
      .exec();
    if (!contasAPagar) {
      throw new NotFoundException('Conta a pagar não encontrada');
    }
    return { message: 'Conta a pagar removida com sucesso' };
  }
}
