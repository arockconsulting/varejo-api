import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema({ timestamps: true })
export class Group extends Document {
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, unique: true })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Prop()
  description: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
