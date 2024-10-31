import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DrugClass } from '../entities/product.entity';

export class ProductDtoOut {
  @ApiPropertyOptional()
  id: number;

  @ApiProperty()
  productCode: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  purchasePrice: number;

  @ApiProperty()
  sellingPrice: number;

  @ApiProperty()
  expiryDate: Date;

  @ApiProperty()
  stockQuantity: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  unitId: number;

  // @ApiPropertyOptional({ description: 'URL of the product image' })
  // productImageUrl?: string;

  @ApiPropertyOptional()
  drugClass?: DrugClass;
}
