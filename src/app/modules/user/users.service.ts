import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateUsersDto,
  LoginDto,
  UpdateRolUser,
  UpdateUserDto,
} from './Users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DivisionsService } from '../division/divisions.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class UsersService {
  private divisionsService: DivisionsService;
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>,
    private jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.divisionsService = this.moduleRef.get(DivisionsService, {
      strict: false,
    });
  }

  async registerUser(createUsuarioDto: CreateUsersDto) {
    createUsuarioDto.password = await bcrypt.hash(
      createUsuarioDto.password,
      10,
    );
    return await this.userModel.create(createUsuarioDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOneUser(id: string) {
    return await this.userModel.findById(id);
  }

  async findByClub(clubId: string) {
    return await this.userModel.find({ club: clubId }).exec();
  }

  async findByDivision(divisionId: string) {
    return await this.userModel.find({ division: divisionId }).exec();
  }

  async update(id: string, updateUsuarioDto: UpdateUserDto) {
    if (updateUsuarioDto.divisions) {
      const divisions = await this.divisionsService.findOne(
        updateUsuarioDto.divisions,
      );

      if (!divisions) {
        throw new NotFoundException('División inválida');
      }
    }

    const userbefore = await this.userModel.findById(id);

    if (!userbefore) {
      throw new NotFoundException(`El usuario con este id: ${id} no existe`);
    }

    if (updateUsuarioDto.password) {
      // Hashear la nueva contraseña antes de la actualización
      const hashedPassword = await bcrypt.hash(updateUsuarioDto.password, 10);
      updateUsuarioDto.password = hashedPassword;
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
      .exec();

    return user;
  }

  async updateRole(id: string, updateRoleDto: UpdateRolUser) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { rol: updateRoleDto.rol },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }

  async findOne(firstname: string, email: string): Promise<Users | undefined> {
    return await this.userModel.findOne({ firstname, email }).exec();
  }

  async signIn(loginDto: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: loginDto.email });
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
