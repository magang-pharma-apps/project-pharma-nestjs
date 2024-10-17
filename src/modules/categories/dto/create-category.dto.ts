import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional({ description: 'URL of the category image' })
  categoryImageUrl?: string;  // Kolom opsional

  // @ApiProperty()
  // status: boolean;
}
