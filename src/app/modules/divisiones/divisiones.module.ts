import { Module } from '@nestjs/common';
import { DivisionesService } from './divisiones.service';
import { DivisionesController } from './divisiones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Divisiones, DivisionesSchema } from './divisiones.schema';

@Module({
  controllers: [DivisionesController],
  providers: [DivisionesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Divisiones.name,
        schema: DivisionesSchema,
      },
    ]),
  ],
})
export class DivisionesModule {}
