import { BaseEntity } from "src/config/common/BaseEntity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "stock_opname_entries" })
export class StockOpnameEntryEntity extends  BaseEntity{
    @PrimaryGeneratedColumn( { name: 'id' } )
    id: number;

    @Column({ name: 'product_id' })
    productId: number;

    @Column({ name: 'physical_stock' })
    physicalStock: number;

    @Column({ name: 'discrepancy' })
    discrepancy: number;

    @Column({ name: 'opname_date' })
    opnameDate: Date;

    @Column({ name: 'note' })
    note: string;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;
}
