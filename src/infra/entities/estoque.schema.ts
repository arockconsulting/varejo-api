import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Estoque extends Document {
  @Prop({ required: true })
  produtoId: string;

  @Prop({ required: true })
  quantidade: number;

  @Prop({ required: true })
  precoUnitario: number;

  @Prop()
  dataUltimaAtualizacao: Date;
}

export const EstoqueSchema = SchemaFactory.createForClass(Estoque);
