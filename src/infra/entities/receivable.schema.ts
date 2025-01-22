// src/schemas/receivable.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

@Schema({ timestamps: true })
export class Receivable extends Document {
  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  client: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'PaymentMethod', required: true })
  paymentMethod: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  amount: number;

  @IsNotEmpty()
  @IsDate()
  @Prop({ required: true })
  dueDate: Date;

  @IsOptional()
  @IsDate()
  @Prop()
  paymentDate?: Date;

  @IsOptional()
  @IsNumber()
  @Prop()
  paymentAmount?: number;

  @IsOptional()
  @IsString()
  @Prop()
  notes?: string;
}

export const ReceivableSchema = SchemaFactory.createForClass(Receivable);
