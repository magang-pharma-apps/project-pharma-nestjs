import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImagesEntity } from './product-images.entity';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { BaseEntity } from 'src/config/common/BaseEntity';
import { InventoryEntity } from 'src/modules/inventories/entities/inventory.entity';
// import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';
import { UnitEntity } from 'src/modules/units/entities/unit.entity';
// import { ProductMixtureEntity } from 'src/modules/product_mixtures/entities/product_mixture.entity';
import { CompoundProductEntity } from 'src/modules/compound_products/entities/compound_product.entity';
// import { StockAdjustmentEntity } from 'src/modules/stock_adjustments/entities/stock_adjustment.entity';
import { CardStockEntryEntity } from 'src/modules/card_stock_entries/entities/card_stock_entry.entity';

// Definisi enum untuk DrugClass
export enum DrugClass {
  OBAT_BEBAS = 'OBAT_BEBAS',
  OBAT_BEBAS_TERBATAS = 'OBAT_BEBAS_TERBATAS',
  OBAT_KERAS = 'OBAT_KERAS',
}

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

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @Column({ name: 'unit_id', nullable: true })
  unitId: number;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  productImageUrl: string;

  @Column({ name: 'local_image_path', type: 'varchar', nullable: true })
  localImagePath: string; // Path untuk gambar yang disimpan secara fisik

  @Column({ name: 'drug_class', type: 'enum', enum: DrugClass, nullable: true })
  drugClass: DrugClass;

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

  @OneToMany(() => CompoundProductEntity, (compound) => compound.product)
  compoundProducts: CompoundProductEntity[];

  @OneToMany(() => ProductImagesEntity, (image) => image.product)
  productImages: ProductImagesEntity[];
  
  @OneToMany(() => InventoryEntity, (inventory) => inventory.product)
  inventories: InventoryEntity[];

  // @OneToMany(() => TransactionEntity, (transaction) => transaction.product)
  // transactions: TransactionEntity[];

  // @OneToMany(() => StockAdjustmentEntity, (stockAdjustment) => stockAdjustment.product)
  // stockAdjustments: StockAdjustmentEntity[];

  @OneToMany(() => CardStockEntryEntity, (cardStockEntry) => cardStockEntry.product)
  cardStockEntries: CardStockEntryEntity[];
}
