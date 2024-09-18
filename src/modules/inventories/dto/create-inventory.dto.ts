import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateInventoryDto {
    @ApiProperty()
    // @IsNotEmpty()
    product_id: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    location: string;

    @ApiProperty()
    note: string;

    @ApiProperty()
    supplier_id: number;

    @ApiProperty()
    warehouse_id: number;

    @ApiPropertyOptional()
    created_by: string;
}
