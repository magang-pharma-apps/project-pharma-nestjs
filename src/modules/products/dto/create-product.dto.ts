import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  // @ApiProperty()
  // supplierId: number;
}
