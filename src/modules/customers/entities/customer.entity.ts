import { BaseEntity } from "src/config/common/BaseEntity";
import { PrescriptionEntity } from "src/modules/prescriptions/entities/prescription.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class CustomerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column({ name: 'age' })
    age: number

    @Column({ name: 'address' })
    address: string

    @OneToMany(() => PrescriptionEntity, (prescription) => prescription.customer)
    prescription: PrescriptionEntity[];
}