import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class PrescriptionRedemptionDtoOut {

    @ApiPropertyOptional()
    id: number

    @ApiProperty()
    prescriptionId: number

    // @ApiProperty()
    // productId: number    

    // @ApiProperty()
    // price: number

    @ApiProperty()
    isPaid: boolean
}