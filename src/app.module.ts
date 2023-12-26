import { Module } from '@nestjs/common';
import { ClubesModule } from './app/modules/club/clubs.module';
import { DivisionesModule } from './app/modules/division/divisions.module';
import { UsuariosModule } from './app/modules/user/users.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './app/shared/shared.module';

@Module({
  imports: [
    ClubesModule,
    DivisionesModule,
    UsuariosModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_UR),
    SharedModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
