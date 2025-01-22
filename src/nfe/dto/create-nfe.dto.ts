import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNfeDto {
  @IsNotEmpty()
  order: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isNfce?: boolean;

  @IsOptional()
  @IsString()
  tipoNota?: string;

  @IsOptional()
  @IsString()
  naturezaOperacao?: string;

  @IsOptional()
  @IsString()
  finalidadeEmissao?: string;

  @IsOptional()
  @IsString()
  tipoEmissao?: string;
}
