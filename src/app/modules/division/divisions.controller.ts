import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { CreateDivisionsDto, UpdateDivisionsDto } from './Divisions.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Divisions')
@ApiBearerAuth()
@Controller('divisions')
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'La division ha sido creada' })
  @ApiResponse({ status: 403, description: 'No se pudo crear la division' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDivisionsDto: CreateDivisionsDto) {
    const u = await this.divisionsService.create(createDivisionsDto);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const u = await this.divisionsService.findAll();
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const u = await this.divisionsService.findOne(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateDivisionsDto: UpdateDivisionsDto,
  ) {
    const u = await this.divisionsService.update(id, updateDivisionsDto);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const u = await this.divisionsService.remove(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }
}
