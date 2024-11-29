import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { InventoryType } from "../entities/inventory.entity";
import { InventoryItemDto } from "./create-inventory.dto";

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

    @ApiProperty({ type: [InventoryItemDto] }) // Menambahkan array items
    items: InventoryItemDto[];
}
