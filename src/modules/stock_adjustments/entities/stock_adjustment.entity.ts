import { BaseEntity } from "src/config/common/BaseEntity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('stock_adjustments')
export class StockAdjustmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id' })
    product_id: number;

    @Column({ name: 'quantity_adjusted' })
    quantity_adjusted: number;

    @Column({ name: 'adjustment_reason' })
    adjustment_reason: string;
    
    @Column({ name: 'date_adjusted' })
    date_adjusted: Date;

    @Column({ name: 'created_by', nullable: true })
    createdBy: string;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: 'created_by',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_user_created_by',
    })
    creator: UserEntity;

}
