import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImagesEntity } from './product-images.entity';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { BaseEntity } from 'src/config/common/BaseEntity';
import { SupplierEntity } from 'src/modules/suppliers/entities/supplier.entity';
import { InventoryEntity } from 'src/modules/inventories/entities/inventory.entity';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';
import { UnitEntity } from 'src/modules/units/entities/unit.entity';
// import { ProductMixtureEntity } from 'src/modules/product_mixtures/entities/product_mixture.entity';
import { CompoundProductEntity } from 'src/modules/compound_products/entities/compound_product.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_code', unique: true })
  productCode: string;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  // @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  // price: number;

  @Column({ name: 'purchase_price', type: 'decimal', precision: 10, scale: 2, default: '0' })
  purchasePrice: number;

  @Column({ name: 'selling_price', type: 'decimal', precision: 10, scale: 2, default: '0' })
  sellingPrice: number;

  @Column({ name: 'expiry_date', type: 'timestamptz' })
  expiryDate: Date;

  @Column({ name: 'stock_quantity' })
  stockQuantity: number;

  @Column({ name: 'status', type: 'boolean', default: false })
  status: boolean;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'unit_id' })
  unitId: number;

  // @Column ({ name: 'supplier_id' })
  // supplierId: number

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_category_id',
  })
  category: CategoryEntity;

  @ManyToOne(() => UnitEntity)
  @JoinColumn({
    name: 'unit_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_unit_id',
  })
  unit: UnitEntity;

  // @ManyToOne(() => SupplierEntity)
  // @JoinColumn({
  //   name: 'supplier_id',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_supplier_id',
  // })
  // supplier: SupplierEntity;

  // @OneToMany(() => ProductMixtureEntity, (mixture) => mixture.product)
  // productMixtures: ProductMixtureEntity[];

  @OneToMany(() => CompoundProductEntity, (compound) => compound.product)
  compoundProducts: CompoundProductEntity[];

  @OneToMany(() => ProductImagesEntity, (image) => image.product)
  productImages: ProductImagesEntity[];
  
  @OneToMany(() => InventoryEntity, (inventory) => inventory.product)
  inventories: InventoryEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.product)
  transactions: TransactionEntity[];
}
