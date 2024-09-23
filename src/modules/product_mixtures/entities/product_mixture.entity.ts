import { BaseEntity } from "src/config/common/BaseEntity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { 
    Column, 
    DeleteDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('product_mixtures')
export class ProductMixtureEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id' })
    product_id: number;

    @Column({ name: 'ingredient_product_id' })
    ingredient_product_id: number;

    @Column({ name: 'quantity' })
    quantity: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
        name: 'ingredient_product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_ingredient_product_id',
    })
    ingredientProduct: ProductEntity;
}
