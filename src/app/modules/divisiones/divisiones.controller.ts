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
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Divisiones')
@ApiBearerAuth()
@Controller('divisiones')
export class DivisionesController {
  constructor(private readonly divisionesService: DivisionesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'La division ha sido creada' })
  @ApiResponse({ status: 403, description: 'No se pudo crear la division' })
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
