import { Injectable } from '@nestjs/common';
import { CreateClubeDto } from './dto/create-clube.dto';
import { UpdateClubeDto } from './dto/update-clube.dto';

@Injectable()
export class ClubesService {
  create(createClubeDto: CreateClubeDto) {
    return createClubeDto;
  }

  findAll() {
    return `This action returns all clubes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clube`;
  }

  update(id: number, updateClubeDto: UpdateClubeDto) {
    return `This action updates a #${id} clube`;
  }

  remove(id: number) {
    return `This action removes a #${id} clube`;
  }
}
