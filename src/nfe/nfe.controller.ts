/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Res,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContasAPagarService } from 'src/finance/contasapagar.service';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';
import { Nfe } from '../infra/entities/nfe.schema';
import { ProductService } from 'src/products/product.service';
import { StockService } from 'src/products/stock.service';
import { EmitirNfeDto } from '../sefaz/dto/emitir-nfe.dto';
import { CreateNfeDto } from './dto/create-nfe.dto';
import { UpdateNfeDto } from './dto/update-nfe.dto';
import { NfeService } from './nfe.service';
import { NfeEntradaService } from './nfeentrada.service';
import { Response } from 'express';

@Controller('nfe')
export class NfeController {
  constructor(
    private readonly produtoService: ProductService,
    private readonly fornecedorService: FornecedorService,
    private readonly estoqueService: StockService,
    private readonly contasAPagarService: ContasAPagarService,
    private readonly nfeService: NfeService,
    private readonly nfeEntradaService: NfeEntradaService,
  ) {}

  @Post('import')
  async importNfe(@Body() nfeData: any) {
    // Extraindo os dados do corpo da requisição
    const {
      emitente,
      destinatario,
      produtos,
      icms,
      pis,
      cofins,
      valorTotal,
      cfop,
    } = nfeData;

    // Verificar e cadastrar o fornecedor (emitente)
    let fornecedorDb = await this.fornecedorService.findByCnpj(emitente.cnpj);
    if (!fornecedorDb) {
      fornecedorDb = await this.fornecedorService.create({
        nome: emitente.nome,
        cnpj: emitente.cnpj,
        endereco: emitente.endereco,
      });
    }

    // Processar os produtos e cadastrar/atualizar estoque
    for (const produto of produtos) {
      let produtoDb = await this.produtoService.findByName(produto.name);
      if (!produtoDb) {
        // Se o produto não existir, criar um novo produto no banco
        const createProdutoDto = {
          name: produto.name,
          quantity: produto.quantity,
          unitPrice: produto.unitPrice,
          totalPrice: produto.totalPrice,
          icms,
          pis,
          cofins,
          cfop,
        };
        produtoDb = await this.produtoService.createProduct(createProdutoDto);
      } else {
        // Se o produto já existir, apenas atualizar o estoque
        await this.produtoService.updateStock(
          produtoDb._id.toString(),
          produto.quantity,
        );
      }

      // Atualizar estoque
      await this.estoqueService.updateStock(
        produtoDb._id.toString(),
        produto.quantity,
      );
    }

    // Criar uma nova conta a pagar para o fornecedor
    await this.contasAPagarService.create({
      fornecedorId: Object(fornecedorDb._id),
      valor: valorTotal,
      dataVencimento: new Date(), // Data de vencimento, pode ser ajustada conforme a lógica
      dataPagamento: null,
    });

    return { message: 'NF-e importada e processada com sucesso!' };
  }

  @Get('entrada')
  async findAllEntrada() {
    return this.nfeEntradaService.findAll();
  }

  @Get('saida')
  findAll(): Promise<Nfe[]> {
    return this.nfeService.findAll();
  }

  @Post()
  create(@Body() createNfeDto: CreateNfeDto): Promise<Nfe> {
    return this.nfeService.create(createNfeDto);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Nfe | null> {
    return this.nfeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNfeDto: UpdateNfeDto,
  ): Promise<Nfe | null> {
    return this.nfeService.update(id, updateNfeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.nfeService.remove(id);
  }

  @Post('emitir')
  @UsePipes(new ValidationPipe())
  async emitirNFe(@Body() dadosNfe: EmitirNfeDto) {
    return this.nfeService.emitirNFe(dadosNfe);
  }

  @Post('upload')
  async uploadNfe(@Body() nfeData: any) {
    return this.nfeEntradaService.processNfe(nfeData);
  }

  @Get(':id/xml')
  @Header('Content-Type', 'text/xml')
  async getXml(@Param('id') nfeId: string) {
    return this.nfeService.generateXml(nfeId);
  }

  @Get(':id/danfe')
  async getDanfe(@Param('id') nfeId: string, @Res() res: Response) {
    const danfeBuffer = await this.nfeService.generateDanfe(nfeId);
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="danfe-${nfeId}.pdf"`,
    });
    res.send(danfeBuffer);
}
}
