/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
// src/stock/stock.service.ts

import { Injectable } from '@nestjs/common';
import * as xml2js from 'xml2js'; // Entidade do Produto
import { ProductService } from './product.service';
import { Product } from '../infra/entities/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Estoque } from '../infra/entities/estoque.schema';
import { Model } from 'mongoose';

@Injectable()
export class StockService {
  constructor(
    private readonly productService: ProductService,
    @InjectModel(Estoque.name) private estoqueModel: Model<Estoque>,
  ) {}

  // Função para processar o XML e atualizar o estoque
  async processInvoiceXML(xmlData: string): Promise<void> {
    const products = await this.parseXML(xmlData);
  }

  // Função para fazer o parsing do XML da NF-e
  private async parseXML(xmlData: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
        if (err) {
          reject(err);
        }

        const invoice = result.nfeProc;
        const items = invoice.NFe.infNFe.det;

        const products: Product[] = items.map((item: any) => {
          return {
            barcode: item.prod.cEAN || '', // Código de barras
            name: item.prod.xProd, // Nome do produto
            ncm: item.prod.NCM, // NCM
            cfop: invoice.NFe.infNFe.ide.CFOP, // CFOP
            quantity: parseFloat(item.prod.qCom), // Quantidade
            price: parseFloat(item.prod.vProd), // Valor
          };
        });

        resolve(products);
      });
    });
  }

  // Função para atualizar ou cadastrar os produtos
  async updateStock(produtoId: string, quantidade: number): Promise<void> {
    await this.estoqueModel.updateOne(
      { _id:produtoId },
      { $inc: { quantidade } },
      { upsert: true },
    );
  }


}
