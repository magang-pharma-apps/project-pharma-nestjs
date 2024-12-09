import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray } from "class-validator";

export class OpnameItemDto {
    @ApiProperty()
    productId: number;

    @ApiProperty()
    physicalStock: number;

    @ApiProperty()
    discrepancy: number;
}

export class CreateStockOpnameEntryDto {
    @ApiProperty({ type: [OpnameItemDto] })
    @IsArray()
    @Type(() => OpnameItemDto)
    items: OpnameItemDto[];

    @ApiProperty()
    opnameDate: Date;

    @ApiProperty()
    note: string;
}
