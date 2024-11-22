import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { InventoryType } from "../entities/inventory.entity";

export class InventoryDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    productId: number;

    // @ApiProperty()
    // warehouseId: number;

    // @ApiProperty()
    // quantityInStock: number;

    @ApiProperty({ enum: InventoryType })
    inventoryType: InventoryType;

    @ApiProperty()
    note: string;
}
