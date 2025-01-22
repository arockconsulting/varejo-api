import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
} from 'class-validator';

@Schema({ timestamps: true })
export class Client extends Document {
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  name: string;

  @IsOptional()
  @IsString()
  @Prop()
  document?: string;

  @IsOptional()
  @IsString()
  @Prop()
  phone?: string;

  @IsOptional()
  @IsEmail()
  @Prop()
  email?: string;

  @IsOptional()
  @IsString()
  @Prop()
  address?: string;

  @IsOptional()
  @IsString()
  @Prop()
  city?: string;

  @IsOptional()
  @IsString()
  @Prop()
  number?: string;

  @IsOptional()
  @IsString()
  @Prop()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  @Prop()
  state?: string;

  @IsOptional()
  @IsString()
  @Prop()
  zipCode?: string;

  @IsOptional()
  @IsBoolean()
  @Prop({ default: true })
  active?: boolean;

  @IsOptional()
  @IsString()
  @Prop()
  ie?: string; // Inscrição Estadual

  @IsOptional()
  @IsString()
  @Prop()
  tipoPessoa?: string; // Tipo de Pessoa (Física/Jurídica)
}

export const ClientSchema = SchemaFactory.createForClass(Client);
