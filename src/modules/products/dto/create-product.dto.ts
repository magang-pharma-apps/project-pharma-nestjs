import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DrugClass } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty()
  productCode: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  // @ApiProperty()
  // price: number;

  @ApiProperty()
  purchasePrice: number;

  @ApiProperty()
  sellingPrice: number;

  @ApiProperty()
  expiryDate: Date;

  @ApiProperty()
  stockQuantity: number;

  // @ApiProperty()
  // status: boolean;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  unitId: number;

  @ApiPropertyOptional({ description: 'URL of the product image' })
  productImageUrl?: string;  // Kolom opsional

  @ApiProperty()
  drugClass?: DrugClass; // Ubah tipe ini dari string menjadi DrugClass
}