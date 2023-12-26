import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDivisioneDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  club: string;
}

export class UpdateDivisionesDto extends PartialType(CreateDivisioneDto) {}
