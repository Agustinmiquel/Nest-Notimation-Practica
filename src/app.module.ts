import { Module } from '@nestjs/common';
import { ClubsModule } from './app/modules/club/clubs.module';
import { DivisionsModule } from './app/modules/division/divisions.module';
import { UsersModule } from './app/modules/user/users.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './app/shared/shared.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ClubsModule,
    DivisionsModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_UR),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: 'schema.ts',
    // }),
    SharedModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
