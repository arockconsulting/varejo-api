import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Usuários')
@ApiBearerAuth() // Requer autenticação no Swagger
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  async create(@Body() createUserDto: any) {
    return this.usersService.createUser(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Get('seed')
  @ApiOperation({ summary: 'Criar um novo admin' })
  async createSeed() {
    return this.usersService.seedAdminUser();
  }
}
