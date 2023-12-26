import { Document, SchemaTypes } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Divisiones } from '../division/divisions.schema';
import { Club } from '../club/clubs.schema';

@Schema()
export class Usuario extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    index: true,
  })
  firstname: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    required: true,
  })
  rol: string;

  @Prop({
    index: true,
  })
  phone: number;

  @Prop({
    index: true,
    required: true,
  })
  password: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Divisiones',
    default: null,
  })
  division: Divisiones;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Club',
    default: null,
  })
  club: Club;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
