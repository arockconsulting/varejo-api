import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

@Schema({ timestamps: true })
export class PaymentMethod extends Document {
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Prop({ required: true, default: false })
  isInstallment: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Prop({ default: 1 })
  installments?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  interestRate?: number;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
