import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

@Schema({ timestamps: true })
export class OrderItem extends Document {
  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Prop({ required: true })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Prop({ required: true })
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  discount: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  vBC?: number; // Valor da Base de Cálculo
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  vIcms?: number; // Valor do ICMS
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  vIpi?: number; // Valor do IPI
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  vPis?: number; // Valor do PIS
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  vCofins?: number; // Valor do COFINS
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order extends Document {
  @IsOptional()
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  client: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  seller: Types.ObjectId;

  @IsOptional()
  @IsString()
  @Prop()
  notes: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  totalDiscount: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Prop({ default: 0 })
  total: number;

  @IsOptional()
  @Prop({ type: Types.ObjectId, ref: 'PaymentMethod' })
  paymentMethod?: Types.ObjectId;

  @Prop({ type: Number, default: 1 })
  installments?: number;

  @IsOptional()
  @IsString()
  @Prop()
  invoiceNumber?: string;

  @IsOptional()
  @IsBoolean()
  @Prop({ default: false })
  isBilled?: boolean;

  @IsOptional()
  @IsString()
  @Prop()
  tipoNota?: string; // Tipo da Nota (NFe/NFCe)

  @IsOptional()
  @IsString()
  @Prop()
  chaveAcesso?: string; // Chave de Acesso da NFe/NFCe

  @IsOptional()
  @IsString()
  @Prop()
  protocolo?: string; // Protocolo de Autorização da SEFAZ

  @IsOptional()
  @IsString()
  @Prop()
  status?: string; // Status da Nota Fiscal (Emitida, Cancelada, etc.)

  @IsOptional()
  @Prop({ type: Types.ObjectId, ref: 'Fornecedor' })
  fornecedor?: Types.ObjectId; // Fornecedor da Nota Fiscal (para notas de entrada)

  @IsOptional()
  @IsString()
  @Prop()
  naturezaOperacao?: string; // Natureza da Operação

  @IsOptional()
  @IsString()
  @Prop()
  finalidadeEmissao?: string; // Finalidade da Emissão (Normal, Complementar, etc.)

  @IsOptional()
  @IsString()
  @Prop()
  tipoEmissao?: string; // Tipo de Emissão (Normal, Contingência)
}

export const OrderSchema = SchemaFactory.createForClass(Order);
