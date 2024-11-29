import { BaseEntityWithoutStatus } from "src/config/common/BaseEntityWithoutStatus";
import { PrescriptionEntity } from "src/modules/prescriptions/entities/prescription.entity";
import { TransactionEntity } from "src/modules/transactions/entities/transaction.entity";
import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    OneToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('prescription_redemptions')
export class PrescriptionRedemptionEntity extends BaseEntityWithoutStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'prescription_id' })
    prescriptionId: number;

    @Column({ name: 'transacation_id', type: 'int', nullable: true })
    transactionId: number;

    @Column({ name: 'is_paid', type: 'boolean', default: false })
    isPaid: boolean;

    @Column({ name: 'is_redeem', type: 'boolean', default: false })
    isRedeem: boolean;

    @ManyToOne(() => PrescriptionEntity)
    @JoinColumn({
        name: 'prescription_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_prescription_id',
    })
    prescription: PrescriptionEntity;

    @OneToOne(() => TransactionEntity, { cascade: true })
    @JoinColumn({ name: 'transacation_id', referencedColumnName: 'id' })
    transaction: TransactionEntity; // Menambahkan relasi dengan TransactionEntity
    
}
