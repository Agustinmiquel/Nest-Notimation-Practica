import { IsString, MinLength, IsOptional, IsObject } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateClubsDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  slogan: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsObject()
  @IsOptional()
  colors: {
    primary: string;
    alternative: string;
    secondary: string;
    detail: string;
  };
}

export class UpdateClubsDto extends PartialType(CreateClubsDto) {}
