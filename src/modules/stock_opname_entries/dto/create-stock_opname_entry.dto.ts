import { ApiProperty } from "@nestjs/swagger";

export class CreateStockOpnameEntryDto {
    @ApiProperty()
    product_id: number;

    @ApiProperty()
    recorded_stock: number;

    @ApiProperty()
    physical_stock: number;

    @ApiProperty()
    opname_date: number;

    @ApiProperty()
    discrepancy: number;
}
