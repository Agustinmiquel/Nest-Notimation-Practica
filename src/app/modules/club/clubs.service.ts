import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubsDto, UpdateClubsDto } from './Clubs.dto';
import { Model } from 'mongoose';
import { Club } from './clubs.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClubsService {
  constructor(
    @InjectModel(Club.name)
    private clubesModel: Model<Club>,
  ) {}

  async create(createClubeDto: CreateClubsDto) {
    createClubeDto.name = createClubeDto.name.toLocaleLowerCase();
    const existName = await this.clubesModel.findOne({
      name: createClubeDto.name,
    });

    if (existName) {
      throw new BadRequestException('El Club ya existe en la BD');
    }

    return this.clubesModel.create(createClubeDto);
  }

  async findAll() {
    return await this.clubesModel.find();
  }

  async findOne(id: string) {
    return await this.clubesModel.findById(id);
  }

  async update(id: string, updateClubesDto: UpdateClubsDto) {
    const club = await this.clubesModel.findByIdAndUpdate(id);

    if (updateClubesDto.name)
      updateClubesDto.name = updateClubesDto.name.toLowerCase();

    if (!club) {
      throw new NotFoundException(`No se ha encontrado un club con id ${id}`);
    }

    await club.updateOne({ ...updateClubesDto }, { new: true });

    return club;
  }

  async remove(id: string) {
    return await this.clubesModel.deleteOne({ _id: id });
  }
}
