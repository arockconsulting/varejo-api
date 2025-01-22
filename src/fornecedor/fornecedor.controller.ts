/*
https://docs.nestjs.com/controllers#controllers
*/
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto, UpdateFornecedorDto } from './dto/fornecedor.dto';

@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.fornecedorService.create(createFornecedorDto);
  }

  @Get()
  async findAll() {
    return this.fornecedorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fornecedorService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.fornecedorService.update(id, updateFornecedorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fornecedorService.remove(id);
  }
}
