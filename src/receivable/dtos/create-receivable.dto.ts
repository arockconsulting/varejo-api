/* eslint-disable prettier/prettier */
// src/dtos/create-receivable.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReceivableDto {
  @IsNotEmpty()
  order: string; // Alterado para string

  @IsNotEmpty()
  client: string; // Alterado para string

  @IsNotEmpty()
  paymentMethod: string; // Alterado para string

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsDate()
  paymentDate?: Date;

  @IsOptional()
  @IsNumber()
  paymentAmount?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
