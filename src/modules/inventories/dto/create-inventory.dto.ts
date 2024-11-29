import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
import { InventoryType } from "../entities/inventory.entity";
import { Type } from "class-transformer";
import { CreateProductDto } from "src/modules/products/dto/create-product.dto";

// DTO untuk item dalam inventory
export class InventoryItemDto {
    @ApiProperty()
    productId: number;
  
    // @ApiProperty()
    // productName: string;
  
    @ApiProperty()
    qtyItem: number;

    @ApiProperty()
    noteItem: string;

    // @ApiProperty({ type: CreateProductDto})
    // @Type(() => CreateProductDto)
    // product: CreateProductDto
  }

export class CreateInventoryDto {
    // @ApiProperty()
    // productId: number;

    // @ApiProperty()
    // warehouseId: number;

    // @ApiProperty()
    // quantityInStock: number;

    @ApiProperty({ type: [InventoryItemDto] })
    @IsArray()
    @Type(() => InventoryItemDto)
    items: InventoryItemDto[]; // Menyimpan array produk (item)

    @ApiProperty()
    inventoryDate: Date; // Tanggal inventory

    @ApiProperty({ enum: InventoryType })
    inventoryType: InventoryType;

    @ApiProperty()
    note: string;
}
