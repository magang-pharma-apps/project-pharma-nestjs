import { BaseEntity } from "src/config/common/BaseEntity";
import { PrescriptionEntity } from "src/modules/prescriptions/entities/prescription.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctors')
export class DoctorEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ name: 'specialization' })
    specialization: string;

    @Column({ name: 'phone_number', type: 'varchar' })
    phoneNumber: string;

    @Column({ name: 'email', type: 'varchar' })
    email: string;

    @OneToMany(() => PrescriptionEntity, (prescription) => prescription.doctor)
    prescription: PrescriptionEntity
}