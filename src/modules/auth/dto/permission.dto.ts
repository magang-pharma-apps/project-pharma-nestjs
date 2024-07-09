import { ApiProperty } from '@nestjs/swagger';

// permission.dto.ts
export class PermissionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

// create-permission.dto.ts
export class CreatePermissionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
