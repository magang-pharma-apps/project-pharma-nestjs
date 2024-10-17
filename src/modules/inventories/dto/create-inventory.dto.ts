import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateInventoryDto {
    @ApiProperty()
    // @IsNotEmpty()
    productId: number;

    @ApiProperty()
    warehouseId: number;

    @ApiProperty()
    quantityInStock: number;

    @ApiProperty()
    note: string;
}
