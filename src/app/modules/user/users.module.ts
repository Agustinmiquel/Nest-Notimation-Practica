import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsuarioSchema, Users } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DivisionsModule } from '../division/divisions.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsuarioSchema,
      },
    ]),
    forwardRef(() => DivisionsModule),
  ],
})
export class UsersModule {}
