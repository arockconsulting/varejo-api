/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../infra/entities/catgories.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('Categorias')
@ApiTags('Categorias')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova categoria' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as categorias' })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém detalhes de uma categoria pelo ID' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma categoria pelo ID' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma categoria pelo ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
