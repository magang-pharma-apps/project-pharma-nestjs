import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProductMixtureDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    product_id: number;

    @ApiPropertyOptional()
    ingredient_product_id: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}