import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/infra/entities/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(dto: any): Promise<Product> {
    const product = new this.productModel(dto);
    return product.save();
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findByBarcode(barcode: string): Promise<Product> {
    return this.productModel.findOne({ barcode }).exec();
  }

  async updateProduct(id: string, dto: any): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async updateStock(produtoId: string, stock: number): Promise<void> {
    await this.productModel.updateOne({ _id: produtoId }, { $inc: { stock } });
  }

  async findByName(name: string): Promise<Product | null> {
    return this.productModel.findOne({ name });
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findOne({ _id: id });
  }
}
