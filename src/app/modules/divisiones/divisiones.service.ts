import { Injectable } from '@nestjs/common';
import { CreateDivisioneDto, UpdateDivisionesDto } from './Divisiones.dto';
import { Divisiones } from './divisiones.schema';
import { Error, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DivisionesService {
  constructor(
    @InjectModel(Divisiones.name)
    private readonly divisionesModel: Model<Divisiones>,
  ) {}

  async create(createDivisioneDto: CreateDivisioneDto) {
    try {
      const division = await this.divisionesModel.create(createDivisioneDto);
      return division;
    } catch (error) {
      console.log(error);
      throw new Error('No se creo la division');
    }
  }

  findAll() {
    return `This action returns all divisiones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} divisione`;
  }

  update(id: number, updateDivisioneDto: UpdateDivisionesDto) {
    return `This action updates a #${id} divisione`;
  }

  async remove(id: string) {
    return await this.divisionesModel.deleteOne({ _id: id });
  }
}
