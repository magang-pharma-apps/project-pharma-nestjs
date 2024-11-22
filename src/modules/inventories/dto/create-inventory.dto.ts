import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { InventoryType } from "../entities/inventory.entity";

export class CreateInventoryDto {
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
