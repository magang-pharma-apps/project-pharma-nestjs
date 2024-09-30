import { PartialType } from '@nestjs/swagger';
import { CreateCompoundProductDto } from './create-compound_product.dto';

export class UpdateCompoundProductDto extends PartialType(CreateCompoundProductDto) {}
