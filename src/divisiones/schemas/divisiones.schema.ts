import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Divisiones extends Document {
  @Prop({
    index: true,
    unique: true,
  })
  name: string;

  @Prop({
    index: true,
    unique: true,
  })
  club: string;
}

export const DivisionesSchema = SchemaFactory.createForClass(Divisiones);
