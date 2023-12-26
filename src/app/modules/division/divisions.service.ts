import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDivisionsDto, UpdateDivisionsDto } from './Divisions.dto';
import { Divisiones } from './divisions.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DivisionsService {
  constructor(
    @InjectModel(Divisiones.name)
    private readonly divisionesModel: Model<Divisiones>,
  ) {}

  async create(createDivisionsDto: CreateDivisionsDto) {
    const division = await this.divisionesModel.create(createDivisionsDto);
    return division;
  }

  async findAll() {
    return await this.divisionesModel.find();
  }

  async findOne(id: string) {
    return await this.divisionesModel.findById(id);
  }

  async update(id: string, updateDivisionesDto: UpdateDivisionsDto) {
    const division = await this.divisionesModel.findByIdAndUpdate(id);

    if (updateDivisionesDto.name)
      updateDivisionesDto.name = updateDivisionesDto.name.toLowerCase();

    if (!division) {
      throw new NotFoundException(`No se ha encontrado un club con id ${id}`);
    }

    await division.updateOne({ ...updateDivisionesDto }, { new: true });

    return division;
  }

  async remove(id: string) {
    return await this.divisionesModel.deleteOne({ _id: id });
  }
}
