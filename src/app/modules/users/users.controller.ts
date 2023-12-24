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
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './users.service';
import { CreateUsuarioDto, LoginDto, UpdateUsuarioDto } from './Users.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'El usuario ha sido creado' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 403, description: 'No se pudo crear el usuario' })
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const u = await this.usuariosService.registerUser(createUsuarioDto);
    console.log(u);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Post('/login')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginDto: LoginDto) {
    const u = await this.usuariosService.signIn(loginDto);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Get()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findAll() {
    const u = this.usuariosService.findAll();
    console.log(u);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    const u = this.usuariosService.findOneUser(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get('byClub/:clubId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async findByClubId(@Param('clubId') clubId: string) {
    const u = await this.usuariosService.findByClub(clubId);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get('byDivision/:divisionId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async findByDivision(@Param('divisionId') divisionId: string) {
    const u = await this.usuariosService.findByDivision(divisionId);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const u = this.usuariosService.update(id, updateUsuarioDto);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    const u = this.usuariosService.remove(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }
}
