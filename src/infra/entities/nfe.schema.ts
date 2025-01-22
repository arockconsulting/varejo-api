import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Nfe {
  @Prop({ required: true })
  accessKey: string;

  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  client: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  seller: string;

  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        discount: { type: Number },
        icms: { type: Number },
        ipi: { type: Number },
        pis: { type: Number },
        cofins: { type: Number },
      },
    ],
    required: true,
  })
  items: any[];

  @Prop({ required: true })
  total: number;

  @Prop()
  totalDiscount?: number;

  @Prop()
  notes?: string;

  @Prop()
  isNfce?: boolean;

  @Prop()
  tipoNota?: string;

  @Prop()
  naturezaOperacao?: string;

  @Prop()
  finalidadeEmissao?: string;

  @Prop()
  tipoEmissao?: string;

  @Prop()
  xml?: string;

  @Prop()
  protocolo?: string;

  @Prop()
  status?: string;

  @Prop({ required: true })
  dataEmissao: Date;
}

export const NfeSchema = SchemaFactory.createForClass(Nfe);
