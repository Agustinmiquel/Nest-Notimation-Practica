import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './Users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuariosModel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
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
}
