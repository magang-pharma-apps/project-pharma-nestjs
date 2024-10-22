import { BaseEntity } from "src/config/common/BaseEntity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { 
    Column, 
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

    @Column({ name: 'user_id' })
    user_id: number;

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

    // @Column({ name: 'status', type: 'boolean', default: false})
    // status: boolean;
    
    @ManyToOne(() => ProductEntity)
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;

    // @ManyToOne(() => UserEntity)
    // @JoinColumn({
    //     name: 'created_by',
    //     referencedColumnName: 'id',
    //     foreignKeyConstraintName: 'fk_user_created_by',
    // })
    // creator: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({
    name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_user_id',
    })
    user: UserEntity;

}
