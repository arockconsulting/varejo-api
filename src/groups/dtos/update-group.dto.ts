import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @ApiProperty({
    description: 'Nome atualizado do grupo',
    example: 'Eletrodomésticos',
    required: false,
  })
  name?: string;
}
