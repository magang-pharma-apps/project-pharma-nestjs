import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateCompoundProductDto {

    @ApiPropertyOptional()
    user_id: number;

    @ApiProperty()
    product_id: number

    @ApiProperty()
    compound_name: string

    @ApiProperty()
    formula_description: string

    @ApiProperty()
    compound_price: number

    @ApiProperty()
    quantity: number

    @ApiProperty()
    expiry_date: Date

    // @ApiProperty()
    // status: boolean
}
