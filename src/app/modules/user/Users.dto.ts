import {
  IsString,
  IsEnum,
  MaxLength,
  IsNumber,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserRoles } from 'src/app/shared/enum/userRoles.enum';

export class CreateUsersDto {
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

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  divisions: string;

  @IsEnum(UserRoles, { message: 'Invalid role' })
  rol: UserRoles;

  @IsString()
  @IsNotEmpty()
  club: string;
}

export class UpdateUserDto extends PartialType(CreateUsersDto) {}

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UpdateRolUser {
  @IsEnum(UserRoles, { message: 'Invalid role' })
  rol: UserRoles;
}
