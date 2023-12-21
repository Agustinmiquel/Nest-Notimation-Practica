import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubesDto, UpdateClubesDto } from './Clubes.dto';
import { Model } from 'mongoose';
import { Club } from './clubes.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClubesService {
  constructor(
    @InjectModel(Club.name)
    private clubesModel: Model<Club>,
  ) {}

  async create(createClubeDto: CreateClubesDto) {
    createClubeDto.name = createClubeDto.name.toLocaleLowerCase();

    try {
      const clubes = await this.clubesModel.create(createClubeDto);
      return clubes;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('El Club ya existe en la BD');
      }
      console.log(error);
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  async findAll() {
    return await this.clubesModel.find();
  }

  async findOne(id: string) {
    return await this.clubesModel.findById(id);
  }

  async update(id: string, updateClubesDto: UpdateClubesDto) {
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
