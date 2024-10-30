import { BaseEntityWithoutStatus } from "src/config/common/BaseEntityWithoutStatus";
import { PrescriptionEntity } from "src/modules/prescriptions/entities/prescription.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

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

    @ManyToOne(() => PrescriptionEntity)
    @JoinColumn({
        name: 'prescription_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_prescription_id',
    })
    prescription: PrescriptionEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;
}
