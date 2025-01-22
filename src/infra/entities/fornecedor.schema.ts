import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Fornecedor extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cnpj: string;

  @Prop()
  endereco: string;

  @Prop()
  ie?: string; // Inscrição Estadual

  @Prop()
  email?: string;

  @Prop()
  telefone?: string;
}

export const FornecedorSchema = SchemaFactory.createForClass(Fornecedor);
