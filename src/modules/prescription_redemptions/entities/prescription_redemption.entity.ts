import { BaseEntityWithoutStatus } from "src/config/common/BaseEntityWithoutStatus";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('prescription_redemptions')
export class PrescriptionRedemptionEntity extends BaseEntityWithoutStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'prescription_id' })
    prescriptionId: number;

    @Column({ name: 'product_id' })
    productId: number;

    @Column({ name: 'price' })
    price: number;

    @Column({ name: 'is_paid', type: 'boolean', default: false })
    isPaid: boolean;
}
