import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class WarehouseDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    location: string;

    // @ApiProperty()
    // status: boolean;

    @ApiProperty()
    supplier_id: number;
}