import { PartialType } from '@nestjs/mapped-types';
import { CreateClubeDto } from './create-clube.dto';

export class UpdateClubeDto extends PartialType(CreateClubeDto) {}
