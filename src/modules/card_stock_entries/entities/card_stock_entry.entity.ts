import { BaseEntity } from "src/config/common/BaseEntity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { TransactionEntity } from "src/modules/transactions/entities/transaction.entity";
import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    Transaction
} from "typeorm";

@Entity('card_stock_entries')
export class CardStockEntryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'product_id' })
    productId: number

    @Column({ name: 'transaction_id' })
    transactionId: number

    @Column({ name: 'change_type', type: 'boolean' })
    changeType: boolean

    @Column({ name: 'quantity_change' })
    quantityChange: number

    @Column({ name: 'date_card_stock' })
    dateCardStock: Date

    @Column({ name: 'reason' })
    reason: string

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;

    @ManyToOne(() => TransactionEntity)
    @JoinColumn({
        name: 'transaction_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_transaction_id',
    })
    transaction: TransactionEntity;
}
