import { IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  email: string;

  @IsString()
  @MaxLength(12)
  firstname: string;
}
