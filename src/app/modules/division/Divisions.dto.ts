import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDivisionsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  club: string;
}

export class UpdateDivisionsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
