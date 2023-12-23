import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DivisionesService } from './divisions.service';
import { CreateDivisioneDto, UpdateDivisionesDto } from './Divisions.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Divisions')
@ApiBearerAuth()
@Controller('divisions')
export class DivisionesController {
  constructor(private readonly divisionesService: DivisionesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'La division ha sido creada' })
  @ApiResponse({ status: 403, description: 'No se pudo crear la division' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDivisioneDto: CreateDivisioneDto) {
    const u = this.divisionesService.create(createDivisioneDto);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    const u = this.divisionesService.findAll();
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    const u = this.divisionesService.findOne(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateDivisioneDto: UpdateDivisionesDto,
  ) {
    const u = this.divisionesService.update(id, updateDivisioneDto);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    const u = this.divisionesService.remove(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }
}
