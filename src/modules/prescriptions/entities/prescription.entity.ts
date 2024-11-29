import { BaseEntityWithoutStatus } from "src/config/common/BaseEntityWithoutStatus";
import { CustomerEntity } from "src/modules/customers/entities/customer.entity";
import { DoctorEntity } from "src/modules/doctors/entities/doctor.entity";
import { PrescriptionRedemptionEntity } from "src/modules/prescription_redemptions/entities/prescription_redemption.entity";
import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('prescriptions')
export class PrescriptionEntity extends BaseEntityWithoutStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name  : 'prescription_code', unique: true })
    prescriptionCode: string;

    @Column({ name  : 'prescriptions'})
    prescriptions: string;

    @Column({ name  : 'prescription_date'})
    prescriptionDate: Date;

    @Column({ name  : 'doctor_id'})
    doctorId: number;

    @Column({ name  : 'customer_id'})
    customerId: number;

    @Column({ name  : 'is_redeem', type: 'boolean', default: false })
    isRedeem: boolean;

    @ManyToOne(() => DoctorEntity)
    @JoinColumn({
        name: 'doctor_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_doctor_id',
    })
    doctor: DoctorEntity;

    @ManyToOne(() => CustomerEntity)
    @JoinColumn({ 
        name: 'customer_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_customer_id',
    })
    customer: CustomerEntity;

    @OneToMany(() => PrescriptionRedemptionEntity, (prescriptionRedemption) => prescriptionRedemption.prescription)
    prescriptionRedemption: PrescriptionRedemptionEntity[];
}
