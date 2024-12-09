import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OpnameItemDto } from "./create-stock_opname_entry.dto";

export class StockOpnameEntryDtoOut {
    @ApiPropertyOptional()
    id: number;
  
    @ApiProperty()
    opnameDate: Date;
  
    @ApiProperty()
    note: string;

    @ApiProperty({ type: [OpnameItemDto] })
    items: OpnameItemDto[];
}