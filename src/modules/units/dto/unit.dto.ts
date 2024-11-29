import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UnitDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}