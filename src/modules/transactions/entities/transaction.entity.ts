import { BaseEntity } from "src/config/common/BaseEntity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { CardStockEntryEntity } from "src/modules/card_stock_entries/entities/card_stock_entry.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

// export enum TransactionType {
//     MASUK = 'masuk',
//     KELUAR = 'keluar',
// }

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    user_id: number;

    @Column({ name: 'transaction_date' })
    transaction_date: Date;

    // @Column({ name: 'transaction_type', type: 'enum', enum: TransactionType })
    // transaction_type: TransactionType;

    @Column({ name: 'transaction_type' })
    transaction_type: string

    @Column({ name: 'category_type'})
    category_type: string

    @Column({ name: 'note'})
    note: string

    @Column({ name: 'tax'})
    tax: number

    @Column({ name: 'sub_total'})
    subTotal: number

    @Column({ name: 'grand_total'})
    grandTotal: number

    @ManyToOne(() => UserEntity)
    @JoinColumn({
    name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_user_id',
    })
    user: UserEntity;

    @OneToMany(() => CardStockEntryEntity, (cardStockEntry) => cardStockEntry.transaction)
    cardStockEntries: CardStockEntryEntity[];
}
