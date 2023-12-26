import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { UsersController } from './users.controller';
import { UsuarioSchema, Usuario } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DivisionsModule } from '../division/divisions.module';

@Module({
  controllers: [UsersController],
  providers: [UsuariosService],
  exports: [UsuariosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      },
    ]),
    forwardRef(() => DivisionsModule),
  ],
})
export class UsersModule {}
