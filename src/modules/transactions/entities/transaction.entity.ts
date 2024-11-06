import { UUID } from "crypto";
import { BaseEntity } from "src/config/common/BaseEntity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { CardStockEntryEntity } from "src/modules/card_stock_entries/entities/card_stock_entry.entity";
import { PrescriptionRedemptionEntity } from "src/modules/prescription_redemptions/entities/prescription_redemption.entity";
import { TransactionDetailEntity } from "src/modules/transaction_details/entities/transaction_detail.entity";
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

export enum PaymentMethod {
    CASH = 'Cash',
    DEBIT = 'Debit',
  }

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: UUID;

    @Column({ name: 'transaction_date' })
    transactionDate: Date;

    // @Column({ name: 'transaction_type', type: 'enum', enum: TransactionType })
    // transaction_type: TransactionType;

    @Column({ name: 'transaction_type' })
    transactionType: string;

    @Column({ name: 'category_type'})
    categoryType: string;

    @Column({ name: 'note'})
    note: string;

    @Column({ name: 'tax'})
    tax: number;

    @Column({ name: 'sub_total'})
    subTotal: number;

    @Column({ name: 'grand_total'})
    grandTotal: number;

    @Column({ name: 'payment_method', type: 'enum', enum: PaymentMethod, nullable: true })
    paymentMethod: PaymentMethod;

    @Column({ name: 'redemption_id', nullable: true })
    redemptionId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_user_id',
    })
    user: UserEntity;

    @ManyToOne(() => PrescriptionRedemptionEntity, (prescriptionRedemption) => prescriptionRedemption.transaction)
    @JoinColumn({
        name: 'redemption_id',
        referencedColumnName: 'id',
    })
    prescriptionRedemption: PrescriptionRedemptionEntity; // Menambahkan relasi ke PrescriptionRedemptionEntity

    @OneToMany(() => TransactionDetailEntity, (transactionDetail) => transactionDetail.transaction, {cascade: true})
    items: TransactionDetailEntity[];

    @OneToMany(() => CardStockEntryEntity, (cardStockEntry) => cardStockEntry.transaction)
    cardStockEntries: CardStockEntryEntity[];
}
