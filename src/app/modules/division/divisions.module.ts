import { Module } from '@nestjs/common';
import { DivisionesService } from './divisions.service';
import { DivisionesController } from './divisions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Divisiones, DivisionesSchema } from './divisions.schema';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule,
  ],
})
export class DivisionesModule {}
