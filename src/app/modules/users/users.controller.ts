import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './users.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './Users.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'El usuario ha sido creado' })
  @ApiResponse({ status: 403, description: 'No se pudo crear el usuario' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOneUser(id);
  }

  @Get('byClub/:clubId')
  async findByClubId(@Param('clubId') clubId: string) {
    const users = await this.usuariosService.findByClub(clubId);
    return users;
  }

  @Get('byDivision/:divisionId')
  async findByDivision(@Param('divisionId') divisionId: string) {
    const user = await this.usuariosService.findByDivision(divisionId);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
