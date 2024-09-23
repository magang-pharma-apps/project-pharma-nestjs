import { PartialType } from '@nestjs/swagger';
import { CreateProductMixtureDto } from './create-product_mixture.dto';

export class UpdateProductMixtureDto extends PartialType(CreateProductMixtureDto) {}
