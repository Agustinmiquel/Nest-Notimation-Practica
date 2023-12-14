import { Module } from '@nestjs/common';
import { ClubesModule } from './clubes/clubes.module';
import { DivisionesModule } from './divisiones/divisiones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ClubesModule,
    DivisionesModule,
    UsuariosModule,
    MongooseModule.forRoot(
      'mongodb+srv://agusm:root@cluster0.xlthkyt.mongodb.net/Notimotion?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
