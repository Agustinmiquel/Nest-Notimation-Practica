import { Module } from '@nestjs/common';
import { ClubesModule } from './app/modules/clubes/clubes.module';
import { DivisionesModule } from './app/modules/divisiones/divisiones.module';
import { UsuariosModule } from './app/modules/usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClubesModule,
    DivisionesModule,
    UsuariosModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_UR),
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
