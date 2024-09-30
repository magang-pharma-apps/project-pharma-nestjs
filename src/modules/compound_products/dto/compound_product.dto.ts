import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CompoundProductDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    product_id: number;

    @ApiProperty()
    compound_name: string;

    @ApiProperty()
    formula_description: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    expiry_date: Date;

    @ApiProperty()
    status: boolean

    @ApiPropertyOptional()
    created_by: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}