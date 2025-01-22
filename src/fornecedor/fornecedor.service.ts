import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fornecedor } from '../infra/entities/fornecedor.schema';
import { CreateFornecedorDto, UpdateFornecedorDto } from './dto/fornecedor.dto';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectModel(Fornecedor.name) private fornecedorModel: Model<Fornecedor>,
  ) {}

  async findByCnpj(cnpj: string): Promise<Fornecedor | null> {
    return this.fornecedorModel.findOne({ cnpj }).exec();
  }

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    const fornecedor = new this.fornecedorModel(createFornecedorDto);
    return fornecedor.save();
  }

  async findAll(): Promise<Fornecedor[]> {
    return this.fornecedorModel.find().exec();
  }

  async findOne(id: string): Promise<Fornecedor | null> {
    const fornecedor = await this.fornecedorModel.findById(id).exec();
    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return fornecedor;
  }

  async update(
    id: string,
    updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor | null> {
    const fornecedor = await this.fornecedorModel
      .findByIdAndUpdate(id, updateFornecedorDto, { new: true })
      .exec();
    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return fornecedor;
  }

  async remove(id: string) {
    const fornecedor = await this.fornecedorModel.findByIdAndDelete(id).exec();
    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return { message: 'Fornecedor removido com sucesso' };
  }
}
