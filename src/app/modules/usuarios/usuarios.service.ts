import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './Usuarios.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './usuarios.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuariosModel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const user = await this.usuariosModel.create(createUsuarioDto);
      return user;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No se puede crear el usuario');
    }
  }

  async findAll() {
    return await this.usuariosModel.find();
  }

  async findOneUser(id: string) {
    return await this.usuariosModel.findById(id);
  }

  async findByClub(clubId: string) {
    try {
      const users = await this.usuariosModel.find({ club: clubId }).exec();
      return users;
    } catch (error) {
      throw new NotFoundException(
        `No se encontraron usuarios con el id ${clubId}`,
      );
    }
  }

  async findByDivision(divisionId: string) {
    try {
      const division = await this.usuariosModel
        .find({ division: divisionId })
        .exec();
      return division;
    } catch (error) {
      throw new NotFoundException(`No se encontro la division ${divisionId}`);
    }
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
    try {
      const user = await this.usuariosModel
        .findOne({ firstname, email })
        .exec();
      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
