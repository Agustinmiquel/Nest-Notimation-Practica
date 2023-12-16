import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuarioSchema, Usuario } from './schemas/usuarios.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      },
    ]),
  ],
})
export class UsuariosModule {}
