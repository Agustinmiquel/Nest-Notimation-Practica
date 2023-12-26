import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsController } from './divisions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Divisiones, DivisionesSchema } from './divisions.schema';
import { SharedModule } from 'src/app/shared/shared.module';

@Module({
  controllers: [DivisionsController],
  providers: [DivisionsService],
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
export class DivisionsModule {}
