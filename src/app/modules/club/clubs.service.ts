import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubsDto, UpdateClubsDto } from './Clubs.dto';
import { Model } from 'mongoose';
import { Clubs } from './clubs.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClubsService {
  constructor(
    @InjectModel(Clubs.name)
    private clubsModel: Model<Clubs>,
  ) {}

  async create(createClubeDto: CreateClubsDto) {
    createClubeDto.name = createClubeDto.name.toLocaleLowerCase();
    const existName = await this.clubsModel.findOne({
      name: createClubeDto.name,
    });

    if (existName) {
      throw new BadRequestException('El Club ya existe en la BD');
    }

    return this.clubsModel.create(createClubeDto);
  }

  async findAll() {
    return await this.clubsModel.find();
  }

  async findOne(id: string) {
    return await this.clubsModel.findById(id);
  }

  async update(id: string, updateClubesDto: UpdateClubsDto) {
    const club = await this.clubsModel.findByIdAndUpdate(id);

    if (updateClubesDto.name)
      updateClubesDto.name = updateClubesDto.name.toLowerCase();

    if (!club) {
      throw new NotFoundException(`No se ha encontrado un club con id ${id}`);
    }

    await club.updateOne({ ...updateClubesDto }, { new: true });

    return club;
  }

  async remove(id: string) {
    return await this.clubsModel.deleteOne({ _id: id });
  }
}
