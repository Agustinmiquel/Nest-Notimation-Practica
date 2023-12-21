import { Document, SchemaTypes } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Divisiones } from '../divisiones/divisiones.schema';
import { Club } from '../clubes/clubes.schema';

@Schema()
export class Usuario extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    unique: true,
    index: true,
  })
  firstname: string;

  @Prop({
    unique: true,
    index: true,
  })
  lastname: string;

  @Prop({
    required: true,
  })
  rol: string;

  @Prop({
    unique: true,
    index: true,
  })
  phone: number;

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
