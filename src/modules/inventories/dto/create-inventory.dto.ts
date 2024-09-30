import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateInventoryDto {
    @ApiProperty()
    // @IsNotEmpty()
    product_id: number;

    @ApiProperty()
    quantity_in_stock: number;

    @ApiProperty()
    note: string;

    @ApiProperty()
    warehouse_id: number;

    @ApiPropertyOptional()
    created_by: string;
}
