// src/stock/stock.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('stock')
@ApiTags('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('adjust-stock')
  async adjustStock(
    @Body()
    { adjustments }: { adjustments: { productId: string; quantity: number }[] },
  ) {
    for (const adjustment of adjustments) {
      // Lógica para ajustar o estoque do produto no banco de dados.
      await this.stockService.updateStock(
        adjustment.productId,
        adjustment.quantity,
      );
    }
    return { message: 'Estoque ajustado com sucesso!' };
  }
  @Post('import')
  async importStock(@Body() body: { xml: string }) {
    const { xml } = body;
    try {
      await this.stockService.processInvoiceXML(xml);
      return { message: 'Estoque atualizado com sucesso!' };
    } catch (error) {
      return { message: 'Erro ao processar o XML', error: error.message };
    }
  }
 
  
}
