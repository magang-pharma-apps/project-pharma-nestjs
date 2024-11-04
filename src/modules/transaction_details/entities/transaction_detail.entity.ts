import { BaseEntity } from "src/config/common/BaseEntity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { TransactionEntity } from "src/modules/transactions/entities/transaction.entity";
import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

@Entity('transaction_details')
export class TransactionDetailEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id' })
    productId: number;

    @Column({ name: 'transaction_id' })
    transactionId: number  

    @Column({ name: 'quantity' })
    quantity: number;

    @Column({ name: 'note' })
    note: string;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
      name: 'product_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;

    @ManyToOne(() => TransactionEntity)
    @JoinColumn({
      name: 'transaction_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_transaction_id',
    })
    transaction: TransactionEntity;
}
