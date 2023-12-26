import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDivisionsDto, UpdateDivisionsDto } from './Divisions.dto';
import { Divisions } from './divisions.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DivisionsService {
  constructor(
    @InjectModel(Divisions.name)
    private readonly divisionsModel: Model<Divisions>,
  ) {}

  async create(createDivisionsDto: CreateDivisionsDto) {
    const division = await this.divisionsModel.create(createDivisionsDto);
    return division;
  }

  async findAll() {
    return await this.divisionsModel.find();
  }

  async findOne(id: string) {
    return await this.divisionsModel.findById(id);
  }

  async update(id: string, updateDivisionesDto: UpdateDivisionsDto) {
    const division = await this.divisionsModel.findByIdAndUpdate(id);

    if (updateDivisionesDto.name)
      updateDivisionesDto.name = updateDivisionesDto.name.toLowerCase();

    if (!division) {
      throw new NotFoundException(`No se ha encontrado un club con id ${id}`);
    }

    await division.updateOne({ ...updateDivisionesDto }, { new: true });

    return division;
  }

  async remove(id: string) {
    return await this.divisionsModel.deleteOne({ _id: id });
  }
}
