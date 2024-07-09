import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;
}

export class CreateRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;
}
