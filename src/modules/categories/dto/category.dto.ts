import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryDtoOut {
  @ApiPropertyOptional()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
