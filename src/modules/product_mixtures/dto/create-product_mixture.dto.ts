import { ApiProperty } from "@nestjs/swagger";

export class CreateProductMixtureDto {

    @ApiProperty()
    product_id: number;

    @ApiProperty()
    ingredient_product_id: number;

    @ApiProperty()
    quantity: number;
}
