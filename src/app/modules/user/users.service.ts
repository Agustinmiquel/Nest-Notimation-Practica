import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateUsuarioDto,
  LoginDto,
  UpdateRolUser,
  UpdateUsuarioDto,
} from './Users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DivisionesService } from '../division/divisions.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class UsuariosService {
  private divisionService: DivisionesService;
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuariosModel: Model<Usuario>,
    private jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.divisionService = this.moduleRef.get(DivisionesService, {
      strict: false,
    });
  }

  async registerUser(createUsuarioDto: CreateUsuarioDto) {
    createUsuarioDto.password = await bcrypt.hash(
      createUsuarioDto.password,
      10,
    );
    return await this.usuariosModel.create(createUsuarioDto);
  }

  async findAll() {
    return await this.usuariosModel.find();
  }

  async findOneUser(id: string) {
    return await this.usuariosModel.findById(id);
  }

  async findByClub(clubId: string) {
    return await this.usuariosModel.find({ club: clubId }).exec();
  }

  async findByDivision(divisionId: string) {
    return await this.usuariosModel.find({ division: divisionId }).exec();
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    if (updateUsuarioDto.division) {
      const division = await this.divisionService.findOne(
        updateUsuarioDto.division,
      );

      if (!division) {
        throw new NotFoundException('División inválida');
      }
    }

    const userbefore = await this.usuariosModel.findById(id);

    if (!userbefore) {
      throw new NotFoundException(`El usuario con este id: ${id} no existe`);
    }

    if (updateUsuarioDto.password) {
      // Hashear la nueva contraseña antes de la actualización
      const hashedPassword = await bcrypt.hash(updateUsuarioDto.password, 10);
      updateUsuarioDto.password = hashedPassword;
    }

    const user = await this.usuariosModel
      .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
      .exec();

    return user;
  }

  async updateRole(id: string, updateRoleDto: UpdateRolUser) {
    return await this.usuariosModel.findByIdAndUpdate(
      { _id: id },
      { rol: updateRoleDto.rol },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.usuariosModel.deleteOne({ _id: id });
  }

  async findOne(
    firstname: string,
    email: string,
  ): Promise<Usuario | undefined> {
    return await this.usuariosModel.findOne({ firstname, email }).exec();
  }

  async signIn(loginDto: { email: string; password: string }) {
    const user = await this.usuariosModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const payload = {
      sub: user.id,
      firstname: user.firstname,
      email: user.email,
    };

    return {
      email: loginDto.email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
