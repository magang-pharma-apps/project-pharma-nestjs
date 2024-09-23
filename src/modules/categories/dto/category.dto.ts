import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryDtoOut {
  @ApiPropertyOptional()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
  
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
