import { ApiProperty } from '@nestjs/swagger';

// Gunakan decorator ApiPropertyOptional untuk mendokumentasikan tipe Task sebagai array
export class ProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar?: string;
}
