import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductImagesDtoOut {
  @ApiPropertyOptional({ type: 'number' })
  id: number;

  @ApiPropertyOptional({ type: 'number' })
  product_id: number;

  @ApiPropertyOptional({ type: 'string' })
  categoryName: string;
}

export class ProductImagesDtoIn {
  @ApiProperty()
  product_id: number;

  @ApiProperty()
  image: string;
}
