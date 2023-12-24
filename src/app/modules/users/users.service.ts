import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto, LoginDto, UpdateUsuarioDto } from './Users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuariosModel: Model<Usuario>,
    private jwtService: JwtService,
  ) {}

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
    const user = this.usuariosModel.findByIdAndUpdate(id, updateUsuarioDto);

    if (!user) {
      throw new NotFoundException(`El usuario con este id: ${id} no existe`);
    }

    return user;
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
      throw new UnauthorizedException('Usuario no encontrado');
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
