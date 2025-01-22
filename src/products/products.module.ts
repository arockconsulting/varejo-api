import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from 'src/infra/entities/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StockService } from './stock.service';
import { Estoque, EstoqueSchema } from 'src/infra/entities/estoque.schema';
import { StockController } from './stock.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: Estoque.name, schema: EstoqueSchema },
    ]),
  ],
  controllers: [ProductController, StockController],
  providers: [ProductService, StockService],
  exports: [ProductService, StockService],
})
export class ProductsModule {}
