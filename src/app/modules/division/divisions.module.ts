import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsController } from './divisions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Divisions, DivisionsSchema } from './divisions.schema';
import { SharedModule } from 'src/app/shared/shared.module';

@Module({
  controllers: [DivisionsController],
  providers: [DivisionsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Divisions.name,
        schema: DivisionsSchema,
      },
    ]),
    SharedModule,
  ],
})
export class DivisionsModule {}
