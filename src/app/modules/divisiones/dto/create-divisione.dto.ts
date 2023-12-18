import { IsString, IsNotEmpty } from 'class-validator';
export class CreateDivisioneDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  club: string;
}
