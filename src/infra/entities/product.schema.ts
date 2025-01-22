import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false})
  barcode?: string;

  @Prop()
  description?: string;

  @Prop()
  imageUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Group' })
  group?: Types.ObjectId;

  @Prop({ default: 0 })
  stock?: number;

  @Prop({ default: 0 })
  minimumStock?: number;

  @Prop({ default: 0 })
  profitMargin?: number;

  @Prop({ default: 0 })
  maximumStock?: number;

  @Prop({ default: 0 })
  basePrice?: number;

  @Prop({ default: 0 })
  costPrice?: number;

  @Prop({ required: false })
  ncm?: string;

  @Prop()
  cest?: string;

  @Prop({ required: false })
  cfop: number; // Alterado para number

  @Prop()
  cst?: string;

  @Prop()
  ipi?: number;

  @Prop()
  icms?: number;

  @Prop()
  pis?: number;

  @Prop()
  cofins?: number;

  @Prop()
  origin?: number; // Alterado para number

  @Prop({ default: true })
  active?: boolean;

  @Prop({ default: false })
  promotional?: boolean;

  @Prop()
  promotionalPrice?: number;

  @Prop()
  extIpi?: string;

  @Prop()
  cEANTrib?: string;

  @Prop()
  uCom?: string;

  @Prop()
  uTrib?: string;

  @Prop()
  modBC?: number;

  @Prop()
  vUnCom?: number; // Valor unitário de comercialização
  @Prop()
  vUnTrib?: number; // Valor unitário tributável
  @Prop()
  indEscala?: string; // Indicador de Escala Relevante
  @Prop()
  vAliqIcms?: number; // Alíquota do ICMS
  @Prop()
  vAliqIpi?: number; // Alíquota do IPI
  @Prop()
  vAliqPis?: number; // Alíquota do PIS
  @Prop()
  vAliqCofins?: number; // Alíquota do COFINS
  @Prop()
  cBenef?: string; // Código de Benefício Fiscal
  @Prop()
  vBC?: number; // Valor da Base de Cálculo
  @Prop()
  vIcms?: number; // Valor do ICMS
  @Prop()
  vIpi?: number; // Valor do IPI
  @Prop()
  vPis?: number; // Valor do PIS
  @Prop()
  vCofins?: number; // Valor do COFINS
}

export const ProductSchema = SchemaFactory.createForClass(Product);
