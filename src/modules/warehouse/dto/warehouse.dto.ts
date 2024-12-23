import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class WarehouseDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    supplierId: number;
}