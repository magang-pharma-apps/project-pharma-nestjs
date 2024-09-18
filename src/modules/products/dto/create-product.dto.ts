import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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

  // @ApiProperty()
  // supplierId: number;
}
