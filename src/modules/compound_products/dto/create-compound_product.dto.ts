import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { UUID } from "crypto";

export class CreateCompoundProductDto {

    @ApiPropertyOptional()
    userId: UUID;

    @ApiProperty()
    productId: number

    @ApiProperty()
    compoundName: string

    @ApiProperty()
    formulaDescription: string

    @ApiProperty()
    compoundPrice: number

    @ApiProperty()
    quantity: number

    @ApiProperty()
    expiryDate: Date

    // @ApiProperty()
    // status: boolean
}
