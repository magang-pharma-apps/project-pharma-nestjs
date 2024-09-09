import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    contact: string;

    @ApiProperty()
    address: string;
}
