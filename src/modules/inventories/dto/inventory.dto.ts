import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class InventoryDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    product_id: number;

    @ApiProperty()
    quantity_in_stock: number;

    @ApiProperty()
    note: string;

    @ApiProperty()
    warehouse_id: number;

    @ApiPropertyOptional()
    created_by: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
