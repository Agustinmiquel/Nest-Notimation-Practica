import { PartialType } from '@nestjs/mapped-types';
import { CreateDivisioneDto } from './create-divisione.dto';

export class UpdateDivisioneDto extends PartialType(CreateDivisioneDto) {}
