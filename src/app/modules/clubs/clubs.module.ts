import { Module } from '@nestjs/common';
import { ClubesService } from './clubs.service';
import { ClubesController } from './clubs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Club, ClubesSchema } from './clubs.schema';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule,
  ],
})
export class ClubesModule {}
