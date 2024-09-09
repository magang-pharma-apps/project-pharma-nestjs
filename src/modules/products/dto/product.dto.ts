import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDtoOut {
  @ApiPropertyOptional()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  expiryDate: Date;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
