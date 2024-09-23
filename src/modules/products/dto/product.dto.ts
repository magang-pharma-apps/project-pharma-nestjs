import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDtoOut {
  @ApiPropertyOptional()
  id: number;

  @ApiProperty()
  codeProduct: string;

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
  status: boolean;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  unitId: number;

  // @ApiProperty()
  // supplierId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
