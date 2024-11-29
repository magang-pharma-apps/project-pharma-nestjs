import { ApiProperty } from "@nestjs/swagger";

export class CreateStockOpnameEntryDto {
    @ApiProperty()
    productId: number;

    @ApiProperty()
    recordedStock: number;

    @ApiProperty()
    physicalStock: number;

    @ApiProperty()
    opnameDate: Date;

    @ApiProperty()
    discrepancy: number;
}
