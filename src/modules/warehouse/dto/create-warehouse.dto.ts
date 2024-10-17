import { ApiProperty } from "@nestjs/swagger";

export class CreateWarehouseDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    location: string;

    // @ApiProperty()
    // status: boolean;

    @ApiProperty()
    supplier_id: number;
}
