import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UUID } from "crypto";

export class CompoundProductDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    productId: number;

    @ApiPropertyOptional()
    userId: UUID;

    @ApiProperty()
    compoundName: string;

    @ApiProperty()
    formulaDescription: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    expiryDate: Date;

    // @ApiProperty()
    // status: boolean
}