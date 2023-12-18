import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DivisionesService } from './divisiones.service';
import { CreateDivisioneDto } from './dto/create-divisione.dto';
import { UpdateDivisioneDto } from './dto/update-divisione.dto';

@Controller('divisiones')
export class DivisionesController {
  constructor(private readonly divisionesService: DivisionesService) {}

  @Post()
  create(@Body() createDivisioneDto: CreateDivisioneDto) {
    return this.divisionesService.create(createDivisioneDto);
  }

  @Get()
  findAll() {
    return this.divisionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divisionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDivisioneDto: UpdateDivisioneDto,
  ) {
    return this.divisionesService.update(+id, updateDivisioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.divisionesService.remove(+id);
  }
}
