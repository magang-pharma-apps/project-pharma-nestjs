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
  stock: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
