import { BaseEntity } from "src/config/common/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class CustomerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @Column()
    address: string
}
