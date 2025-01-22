import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NfeEntradaDocument = HydratedDocument<NfeEntrada>;

@Schema({ timestamps: true })
export class NfeEntrada {
  @Prop({ required: true })
  accessKey: string;

  @Prop({ required: true })
  supplierName: string;

  @Prop({ required: true })
  totalValue: number;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  emissionDate: Date;
}

export const NfeEntradaSchema = SchemaFactory.createForClass(NfeEntrada);
