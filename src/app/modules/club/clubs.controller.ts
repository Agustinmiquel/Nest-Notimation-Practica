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
import { ClubsService } from './clubs.service';
import { CreateClubsDto, UpdateClubsDto } from './Clubs.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Clubs')
@ApiBearerAuth()
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'El club ha sido creado' })
  @ApiResponse({ status: 403, description: 'El club no se pudo crear' })
  async create(@Body() createClubeDto: CreateClubsDto) {
    const u = await this.clubsService.create(createClubeDto);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const u = await this.clubsService.findAll();
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const u = await this.clubsService.findOne(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateClubeDto: UpdateClubsDto,
  ) {
    const u = await this.clubsService.update(id, updateClubeDto);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const u = await this.clubsService.remove(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }
}
