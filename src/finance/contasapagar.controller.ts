/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContasAPagarService } from './contasapagar.service';
import { CreateContasAPagarDto, UpdateContasAPagarDto } from './dto/contas-a-pagar.dto';

@Controller('contas-a-pagar')
export class ContasapagarController {
  constructor(private readonly contasAPagarService: ContasAPagarService) {}

  @Post()
  async create(@Body() createContasAPagarDto: CreateContasAPagarDto) {
    return this.contasAPagarService.create(createContasAPagarDto);
  }

  @Get()
  async findAll() {
    return this.contasAPagarService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contasAPagarService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContasAPagarDto: UpdateContasAPagarDto,
  ) {
    return this.contasAPagarService.update(id, updateContasAPagarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contasAPagarService.remove(id);
  }
}
