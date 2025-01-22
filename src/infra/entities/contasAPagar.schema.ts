import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ContasAPagar extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Fornecedor' })
  fornecedorId: Types.ObjectId;;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  dataVencimento: Date;

  @Prop()
  dataPagamento: Date;
}

export const ContasAPagarSchema = SchemaFactory.createForClass(ContasAPagar);
