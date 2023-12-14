import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: true } })
export class Clube extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  slogan: string;

  @Prop({
    unique: true,
    index: true,
  })
  logo: string;
}

export const ClubesSchema = SchemaFactory.createForClass(Clube);
