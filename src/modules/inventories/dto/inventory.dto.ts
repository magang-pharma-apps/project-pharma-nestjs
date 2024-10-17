import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class InventoryDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    warehouseId: number;

    @ApiProperty()
    quantityInStock: number;

    @ApiProperty()
    note: string;
}
