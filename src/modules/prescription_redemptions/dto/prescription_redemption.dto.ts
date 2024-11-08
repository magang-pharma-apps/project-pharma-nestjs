import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class PrescriptionRedemptionDtoOut {

    @ApiPropertyOptional()
    id: number

    @ApiProperty()
    prescriptionId: number

    @ApiProperty()
    isPaid: boolean

    @ApiProperty()
    isRedeem: boolean
}