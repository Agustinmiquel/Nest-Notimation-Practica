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
import { UsersService } from './users.service';
import {
  CreateUsersDto,
  LoginDto,
  UpdateRolUser,
  UpdateUserDto,
} from './Users.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'El usuario ha sido creado' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 403, description: 'No se pudo crear el usuario' })
  async create(@Body() createUserDto: CreateUsersDto) {
    const u = await this.usersService.registerUser(createUserDto);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginDto: LoginDto) {
    const u = await this.usersService.signIn(loginDto);
    return { statuscode: HttpStatus.CREATED, result: { data: u } };
  }

  @Get()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const u = await this.usersService.findAll();
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const u = await this.usersService.findOneUser(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get('byClub/:clubId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async findByClubId(@Param('clubId') clubId: string) {
    const u = await this.usersService.findByClub(clubId);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Get('byDivision/:divisionId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async findByDivision(@Param('divisionId') divisionId: string) {
    const u = await this.usersService.findByDivision(divisionId);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Put(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUserDto,
  ) {
    const u = await this.usersService.update(id, updateUsuarioDto);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    const u = this.usersService.remove(id);
    return { statuscode: HttpStatus.OK, result: { data: u } };
  }

  @Put('rol/:id')
  @HttpCode(HttpStatus.OK)
  async updateRole(@Param('id') id: string, @Body() updaterole: UpdateRolUser) {
    const user = await this.usersService.updateRole(id, updaterole);
    return { statuscode: HttpStatus.OK, result: { data: user } };
  }
}
