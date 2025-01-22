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
import { GroupService } from './group.service';
import { Group } from '../infra/entities/group.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { CreateGroupDto } from './dtos/create-group.dto';
@Controller('groups')
@ApiTags('Groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo grupo' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateGroupDto): Promise<Group> {
    return this.groupService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os grupos' })
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém detalhes de um grupo pelo ID' })
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um grupo pelo ID' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateGroupDto,
  ): Promise<Group> {
    return this.groupService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um grupo pelo ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.groupService.delete(id);
  }
}
