import { BaseEntity } from "src/config/common/BaseEntity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { 
    Column, 
    DeleteDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('compound_products')
export class CompoundProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id' })
    productId: number;

    @Column({ name: 'compound_name' })
    compoundName: string;

    @Column({ name: 'formula_description' })
    formulaDescription: string;

    @Column({ name: 'compound_price' })
    compoundPrice: number;

    @Column({ name: 'quantity' })
    quantity: number;

    @Column({ name: 'expiry_date' })
    expiryDate: Date;

    @Column({ name: 'status', type: 'boolean', default: false})
    status: boolean;

    @Column({ name: 'created_by', nullable: true })
    createdBy: string;
    
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: 'created_by',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_user_created_by',
    })
    creator: UserEntity;

}
