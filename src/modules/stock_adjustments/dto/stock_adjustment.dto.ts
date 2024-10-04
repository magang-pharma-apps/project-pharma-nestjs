import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class StockAdjustmentDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    product_id: number;

    // @ApiPropertyOptional()
    // adjusted_by: 

    @ApiProperty()
    quantity_adjusted: number;

    @ApiProperty()
    adjustment_reason: string;

    @ApiProperty()
    date_adjusted: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}