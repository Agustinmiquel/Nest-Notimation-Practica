import { Injectable } from '@nestjs/common';
import { CreateDivisioneDto } from './dto/create-divisione.dto';
import { UpdateDivisioneDto } from './dto/update-divisione.dto';

@Injectable()
export class DivisionesService {
  create(createDivisioneDto: CreateDivisioneDto) {
    return 'This action adds a new divisione';
  }

  findAll() {
    return `This action returns all divisiones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} divisione`;
  }

  update(id: number, updateDivisioneDto: UpdateDivisioneDto) {
    return `This action updates a #${id} divisione`;
  }

  remove(id: number) {
    return `This action removes a #${id} divisione`;
  }
}
