import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateContasAPagarDto {
  @IsNotEmpty()
  fornecedorId: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsDateString()
  dataVencimento: Date;

  @IsOptional()
  @IsDateString()
  dataPagamento?: Date;
}

export class UpdateContasAPagarDto {
  @IsOptional()
  fornecedorId?: Types.ObjectId;

  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsDateString()
  dataVencimento?: Date;

  @IsOptional()
  @IsDateString()
  dataPagamento?: Date;
}
