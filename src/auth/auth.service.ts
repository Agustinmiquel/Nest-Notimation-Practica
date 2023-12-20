import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/app/modules/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async signIn(firstname, email) {
    const user = await this.usersService.findOne(firstname, email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      firstname: user.firstname,
      email: user.email,
    };

    return {
      firstname,
      email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
