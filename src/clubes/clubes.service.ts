import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClubeDto } from './dto/create-clube.dto';
import { UpdateClubeDto } from './dto/update-clube.dto';
import { Model } from 'mongoose';
import { Clube } from './schemas/clubes.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClubesService {
  constructor(
    @InjectModel(Clube.name)
    private clubesModel: Model<Clube>,
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

  update(id: number, updateClubeDto: UpdateClubeDto) {
    return `This action updates a #${id} clube`;
  }

  remove(id: number) {
    return `This action removes a #${id} clube`;
  }
}
