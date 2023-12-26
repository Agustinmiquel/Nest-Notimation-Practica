import { Document, SchemaTypes } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Club } from '../club/clubs.schema';

@Schema()
export class Divisiones extends Document {
  @Prop({
    index: true,
  })
  name: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Club',
    default: null,
    required: true,
  })
  club: Club;
}

export const DivisionesSchema = SchemaFactory.createForClass(Divisiones);
