import { Module } from '@nestjs/common';
import { ClubesService } from './clubes.service';
import { ClubesController } from './clubes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Club, ClubesSchema } from './schemas/clubes.schema';

@Module({
  controllers: [ClubesController],
  providers: [ClubesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Club.name,
        schema: ClubesSchema,
      },
    ]),
  ],
})
export class ClubesModule {}
