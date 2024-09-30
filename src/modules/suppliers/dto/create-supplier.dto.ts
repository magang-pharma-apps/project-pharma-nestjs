import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    contactNumber: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;
}
