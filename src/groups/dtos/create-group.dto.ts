import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Nome do grupo',
    example: 'Eletrônicos',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
