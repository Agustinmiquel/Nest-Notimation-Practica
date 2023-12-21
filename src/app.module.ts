import { Module } from '@nestjs/common';
import { ClubesModule } from './app/modules/clubes/clubes.module';
import { DivisionesModule } from './app/modules/divisiones/divisiones.module';
import { UsuariosModule } from './app/modules/usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './app/modules/auth/auth.module';
import { SharedModule } from './app/shared/shared.module';

@Module({
  imports: [
    ClubesModule,
    DivisionesModule,
    UsuariosModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_UR),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
