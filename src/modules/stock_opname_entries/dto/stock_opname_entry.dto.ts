import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class StockOpnameEntryDtoOut {
    @ApiPropertyOptional()
    id: number;
  
    @ApiProperty()
    productId: number;

    @ApiProperty()
    recordedStock: number;
  
    @ApiProperty()
    physicalStock: number;
  
    @ApiProperty()
    opnameDate: number;
  
    @ApiProperty()
    discrepancy: number;
}