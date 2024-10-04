import { ApiProperty } from "@nestjs/swagger";

export class CreateStockAdjustmentDto {

    @ApiProperty()
    product_id: number

    @ApiProperty()
    quantity_adjusted: number

    @ApiProperty()
    adjustment_reason: string

    @ApiProperty()
    date_adjusted: Date
}
