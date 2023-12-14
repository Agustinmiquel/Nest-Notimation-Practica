import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

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
    unique: true,
    index: true,
    required: true,
  })
  rol: string;

  @Prop({
    unique: true,
    index: true,
  })
  phone: number;

  @Prop({
    unique: true,
    index: true,
  })
  division: string;

  @Prop({
    unique: true,
    index: true,
  })
  club: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
