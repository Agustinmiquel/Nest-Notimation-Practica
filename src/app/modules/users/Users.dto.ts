import {
  IsString,
  IsEnum,
  MaxLength,
  IsNumber,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUsuarioDto {
  @IsString()
  email: string;

  @IsString()
  @MaxLength(12)
  firstname: string;

  @IsString()
  @MaxLength(10)
  lastname: string;

  @IsNumber()
  phone: number;

  @IsEnum(['player', 'coach'], { message: 'Debe ser o player o coach' })
  rol: 'player' | 'coach';

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  division: string;

  @IsString()
  @IsNotEmpty()
  club: string;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
