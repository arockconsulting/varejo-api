import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    description: 'Nome atualizado da categoria',
    example: 'Smartphones',
    required: false,
  })
  name?: string;
}
