import { Document, SchemaTypes } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Clubs } from '../club/clubs.schema';

@Schema()
export class Divisions extends Document {
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
  club: Clubs;
}

export const DivisionesSchema = SchemaFactory.createForClass(Divisions);
