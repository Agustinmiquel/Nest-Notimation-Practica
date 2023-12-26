import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: true } })
export class Clubs extends Document {
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

  @Prop({
    required: true,
    type: {
      primary: String,
      alternative: String,
      secondary: String,
      detail: String,
    },
  })
  colors: {
    primary: string;
    alternative: string;
    secondary: string;
    detail: string;
  };
}

export const ClubesSchema = SchemaFactory.createForClass(Clubs);
