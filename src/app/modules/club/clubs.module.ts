import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Club, ClubesSchema } from './clubs.schema';
import { SharedModule } from 'src/app/shared/shared.module';

@Module({
  controllers: [ClubsController],
  providers: [ClubsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Club.name,
        schema: ClubesSchema,
      },
    ]),
    SharedModule,
  ],
})
export class ClubsModule {}
