import { Module } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { UsuariosController } from './users.controller';
import { UsuarioSchema, Usuario } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule,
  ],
})
export class UsuariosModule {}
