import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class UpdateOrderItemDto {
  @IsOptional()
  product?: Types.ObjectId;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;
}
export class UpdateOrderDto {
  @IsOptional()
  client?: Types.ObjectId;

  @IsOptional()
  seller?: Types.ObjectId;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderItemDto)
  items?: UpdateOrderItemDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalDiscount?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  installments?: number;

  @IsOptional()
  paymentMethod?: Types.ObjectId;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsBoolean()
  isBilled?: boolean;
}
