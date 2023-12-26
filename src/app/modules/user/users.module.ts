import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { UsuariosController } from './users.controller';
import { UsuarioSchema, Usuario } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DivisionesModule } from '../division/divisions.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      },
    ]),
    forwardRef(() => DivisionesModule),
  ],
})
export class UsuariosModule {}
