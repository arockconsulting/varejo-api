import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  category?: Types.ObjectId;

  @IsOptional()
  group?: Types.ObjectId;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumStock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  profitMargin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumStock?: number;

  @IsOptional()
  @IsNumber()
  basePrice?: number;

  @IsOptional()
  @IsNumber()
  costPrice?: number;

  @IsOptional()
  @IsString()
  ncm?: string;

  @IsOptional()
  @IsString()
  cest?: string;

  @IsOptional()
  @IsInt()
  cfop?: number;

  @IsOptional()
  @IsString()
  cst?: string;

  @IsOptional()
  @IsNumber()
  ipi?: number;

  @IsOptional()
  @IsNumber()
  icms?: number;

  @IsOptional()
  @IsNumber()
  pis?: number;

  @IsOptional()
  @IsNumber()
  cofins?: number;

  @IsOptional()
  @IsNumber()
  origin?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  promotional?: boolean;

  @IsOptional()
  @IsNumber()
  promotionalPrice?: number;

  // Campos adicionados para NFeDet
  @IsOptional()
  @IsString()
  extIpi?: string;

  @IsOptional()
  @IsString()
  cEANTrib?: string;

  @IsOptional()
  @IsString()
  uCom?: string;

  @IsOptional()
  @IsString()
  uTrib?: string;

  @IsOptional()
  @IsNumber()
  modBC?: number;

  @IsOptional()
  @IsNumber()
  vUnCom?: number; // Valor unitário de comercialização
  @IsOptional()
  @IsNumber()
  vUnTrib?: number; // Valor unitário tributável
  @IsOptional()
  @IsString()
  indEscala?: string; // Indicador de Escala Relevante

  @IsOptional()
  @IsNumber()
  vAliqIcms?: number; // Alíquota do ICMS
  @IsOptional()
  @IsNumber()
  vAliqIpi?: number; // Alíquota do IPI
  @IsOptional()
  @IsNumber()
  vAliqPis?: number; // Alíquota do PIS
  @IsOptional()
  @IsNumber()
  vAliqCofins?: number; // Alíquota do COFINS

  @IsOptional()
  @IsString()
  cBenef?: string; // Código de Benefício Fiscal

  @IsOptional()
  @IsNumber()
  vBC?: number; // Valor da Base de Cálculo
  @IsOptional()
  @IsNumber()
  vIcms?: number; // Valor do ICMS
  @IsOptional()
  @IsNumber()
  vIpi?: number; // Valor do IPI
  @IsOptional()
  @IsNumber()
  vPis?: number; // Valor do PIS
  @IsOptional()
  @IsNumber()
  vCofins?: number; // Valor do COFINS
}
