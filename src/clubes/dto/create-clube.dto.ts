import { IsString, Min, IsMongoId, IsOptional} from 'class-validator';

export class CreateClubeDto {
  @IsString()
  @Min(4)
  name: string;

  @IsString()
  slogan: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  colors: {
    primary: string;
    alternative: string;
    secondary: string;
    detail: string;
  };
}
