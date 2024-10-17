import { BaseEntity } from "src/config/common/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "stock_opname_entries" })
export class StockOpnameEntryEntity extends  BaseEntity{
    @PrimaryGeneratedColumn( { name: 'id' } )
    id: number

    @Column({ name: 'product_id' })
    productId: number

    @Column({ name: 'recorded_stock' })
    recordedStock: number

    @Column({ name: 'physical_stock' })
    physicalStock: number

    @Column({ name: 'opname_date' })
    opnameDate: number

    @Column({ name: 'discrepancy' })
    discrepancy: number
}
