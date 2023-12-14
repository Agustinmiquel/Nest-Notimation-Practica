import { IsString, MinLength, IsOptional, IsObject } from 'class-validator';

export class CreateClubeDto {
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
