/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContasAPagarService } from 'src/finance/contasapagar.service';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';
import { NfeEntrada } from '../infra/entities/nfeEntrada.schema';
import { CreateProductDto } from 'src/products/dtos/create-product.dto';
import { ProductService } from 'src/products/product.service';

@Injectable()
export class NfeEntradaService {
  constructor(
    @InjectModel(NfeEntrada.name) private nfeModel: Model<NfeEntrada>,
    private productsService: ProductService,
    private fornecedorService: FornecedorService,
    private contasAPagarService: ContasAPagarService,
  ) {}

  async processNfe(nfeData: any): Promise<any> {
    try {
      let existingProduct: any;
      const newNfe = new this.nfeModel({
        accessKey: nfeData.chave,
        supplierName: nfeData.emitente.nome,
        totalValue: nfeData.valorTotal,
        userId: 1,
        emissionDate: nfeData.dataEmissao,
      });

      await newNfe.save();

      // Processar Fornecedor
      let fornecedor = await this.fornecedorService.findByCnpj(
        nfeData.emitente.cnpj,
      );
      if (!fornecedor) {
        fornecedor = await this.fornecedorService.create({
          nome: nfeData.emitente.nome,
          cnpj: nfeData.emitente.cnpj,
          endereco: nfeData.emitente.endereco,
        });
      }

      // Processar Contas a Pagar
      const dataVencimento = new Date(nfeData.dataEmissao); // Usando a data de emissão como exemplo
      await this.contasAPagarService.create({
        fornecedorId: Object(fornecedor._id),
        valor: nfeData.valorTotal,
        dataVencimento,
        dataPagamento: null,
      });

      for (const product of Array.isArray(nfeData.produtos)
        ? nfeData.produtos
        : [nfeData.produtos]) {
        if (product.barcode !== '') {
          existingProduct = await this.productsService.findByBarcode(
            product.barcode,
          );
        }

        const createProductDto: CreateProductDto = {
          name: product.name,
          barcode: product.barcode,
          ncm: product.ncm,
          costPrice: product.unitPrice,
          uCom: product.uCom,
          uTrib: product.uTrib,
          vUnCom: product.vUnCom,
          vUnTrib: product.vUnTrib,
          vAliqIcms: product.vAliqIcms,
          vAliqIpi: product.vAliqIpi,
          vAliqPis: product.vAliqPis,
          vAliqCofins: product.vAliqCofins,
          cEANTrib: product.cEANTrib,
          cst: product.cst,
          origin: product.orig,
          cfop: product.cfop,
        };

        if (existingProduct) {
          await this.productsService.updateStock(
            existingProduct._id,
            product.quantity,
          );
        } else {
          const newProduct: any = await this.productsService.createProduct(
            createProductDto,
          );
          await this.productsService.updateStock(
            newProduct._id,
            product.quantity,
          );
        }
      }

      return { message: 'NFe importada com sucesso!' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao processar XML');
    }
  }
  async findAll(): Promise<NfeEntrada[]> {
    return this.nfeModel.find().exec();
  }
}
