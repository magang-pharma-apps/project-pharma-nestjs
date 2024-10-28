import { BaseEntity } from "src/config/common/BaseEntity";
import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('prescriptions')
export class PrescriptionEntity extends BaseEntity {
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
}
