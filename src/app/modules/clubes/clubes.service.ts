import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubeDto } from './dto/create-clube.dto';
import { UpdateClubeDto } from './dto/update-clube.dto';
import { Model } from 'mongoose';
import { Club } from './schemas/clubes.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClubesService {
  constructor(
    @InjectModel(Club.name)
    private clubesModel: Model<Club>,
  ) {}

  async create(createClubeDto: CreateClubeDto) {
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

  async update(id: string, updateClubeDto: UpdateClubeDto) {
    const club = await this.clubesModel.findByIdAndUpdate(id);

    if (updateClubeDto.name)
      updateClubeDto.name = updateClubeDto.name.toLowerCase();

    if (!club) {
      throw new NotFoundException(`No se ha encontrado un club con id ${id}`);
    }

    await club.updateOne({ ...updateClubeDto }, { new: true });

    return club;
  }

  async remove(id: string) {
    const club = await this.findOne(id);
    await club.deleteOne();
  }
}
