import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryDtoOut {
  @ApiPropertyOptional()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional({ description: 'URL of the category image' })
  categoryImageUrl?: string;  // Kolom opsional
}
