import { Document, SchemaTypes } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Club } from '../../clubes/schemas/clubes.schema';

@Schema()
export class Divisiones extends Document {
  @Prop({
    index: true,
    unique: true,
  })
  name: string;

  @Prop({
    unique: true,
    type: SchemaTypes.ObjectId,
    ref: 'Clubes',
    default: null,
  })
  club: Club;
}

export const DivisionesSchema = SchemaFactory.createForClass(Divisiones);
