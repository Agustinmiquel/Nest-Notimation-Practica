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
  async create(@Body() createClubeDto: CreateClubesDto) {
    const u = await this.clubesService.create(createClubeDto);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const u = await this.clubesService.findAll();
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const u = await this.clubesService.findOne(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateClubeDto: UpdateClubesDto,
  ) {
    const u = await this.clubesService.update(id, updateClubeDto);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const u = await this.clubesService.remove(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }
}
