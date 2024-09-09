import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SupplierDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    contact: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}