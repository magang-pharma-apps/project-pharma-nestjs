import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
}
