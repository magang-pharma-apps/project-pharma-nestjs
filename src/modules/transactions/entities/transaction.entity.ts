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

export enum TransactionType {
    MASUK = 'masuk',
    KELUAR = 'keluar',
}

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id' })
    product_id: number;

    @Column({ name: 'quantity' })
    quantity: number;

    @Column({ name: 'total_price' })
    total_price: number;

    @Column({ name: 'transaction_date' })
    transaction_date: Date;

    @Column({ name: 'user_id' })
    user_id: number;

    @Column({ name: 'transaction_type', type: 'enum', enum: TransactionType })
    transaction_type: TransactionType;

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
    name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_user_id',
    })
    user: UserEntity;
}
