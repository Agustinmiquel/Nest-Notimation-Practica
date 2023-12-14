import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClubesService } from './clubes.service';
import { CreateClubeDto } from './dto/create-clube.dto';
import { UpdateClubeDto } from './dto/update-clube.dto';

@Controller('clubes')
export class ClubesController {
  constructor(private readonly clubesService: ClubesService) {}

  @Post()
  create(@Body() createClubeDto: CreateClubeDto) {
    return this.clubesService.create(createClubeDto);
  }

  @Get()
  findAll() {
    return this.clubesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubeDto: UpdateClubeDto) {
    return this.clubesService.update(+id, updateClubeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubesService.remove(+id);
  }
}
