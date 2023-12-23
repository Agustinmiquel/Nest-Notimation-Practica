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
import { ClubesService } from './clubs.service';
import { CreateClubesDto, UpdateClubesDto } from './Clubs.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Clubs')
@ApiBearerAuth()
@Controller('clubs')
export class ClubesController {
  constructor(private readonly clubesService: ClubesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'El club ha sido creado' })
  @ApiResponse({ status: 403, description: 'El club no se pudo crear' })
  create(@Body() createClubeDto: CreateClubesDto) {
    const u = this.clubesService.create(createClubeDto);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    const u = this.clubesService.findAll();
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    const u = this.clubesService.findOne(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateClubeDto: UpdateClubesDto) {
    const u = this.clubesService.update(id, updateClubeDto);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    const u = this.clubesService.remove(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }
}
