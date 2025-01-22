// src/receivable/receivable.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { CreateReceivableDto } from './dtos/create-receivable.dto';
import { Receivable } from 'src/infra/entities/receivable.schema';

@Controller('receivables')
export class ReceivableController {
  constructor(private readonly receivableService: ReceivableService) {}

  @Post()
  async create(
    @Body() createReceivableDto: CreateReceivableDto,
  ): Promise<Receivable> {
    return this.receivableService.create(createReceivableDto);
  }

  @Get()
  async findAll(): Promise<Receivable[]> {
    return this.receivableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Receivable> {
    return this.receivableService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReceivableDto: Partial<Receivable>,
  ): Promise<Receivable> {
    return this.receivableService.update(id, updateReceivableDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.receivableService.remove(id);
  }
}
