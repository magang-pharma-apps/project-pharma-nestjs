import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { InventoryType } from "../entities/inventory.entity";

// DTO untuk item dalam inventory
class InventoryItemDto {
    @ApiProperty()
    productId: number;
  
    // @ApiProperty()
    // productName: string;
  
    @ApiProperty()
    quantity: number;

    @ApiProperty()
    noteItem: string;
  }

export class CreateInventoryDto {
    // @ApiProperty()
    // productId: number;

    // @ApiProperty()
    // warehouseId: number;

    // @ApiProperty()
    // quantityInStock: number;

    @ApiProperty({ type: [InventoryItemDto] })
    items: InventoryItemDto[]; // Menyimpan array produk (item)

    @ApiProperty()
    inventoryDate: Date; // Tanggal inventory

    @ApiProperty({ enum: InventoryType })
    inventoryType: InventoryType;

    @ApiProperty()
    note: string;
}
