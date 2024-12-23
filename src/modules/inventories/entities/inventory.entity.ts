import { BaseEntity } from "src/config/common/BaseEntity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { WarehouseEntity } from "src/modules/warehouse/entities/warehouse.entity";
import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

export enum InventoryType {
    IN = 'In',
    OUT = 'Out',
    // ADJUST = 'Adjust',
}

export enum ReasonType {
    PURCHASE = 'Purchase',
    // STOCK_ADJUSTMENT = 'Stock Adjustment',
    REPLACEMENT = 'Replacement',
    BONUS = 'Bonus',
    EXPIRED = 'Expired',
    DAMAGE = 'Damage',
    LOST = 'Lost',
}

@Entity('inventories')
export class InventoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id' })
    productId: number;
    
    // @Column ({ name: 'warehouse_id' })
    // warehouseId: number

    // @Column({ name: 'quantity_in_stock' })
    // quantityInStock: number;

    @Column({ name: 'inventory_type', type: 'enum', enum: InventoryType, nullable: true })
    inventoryType: InventoryType;

    @Column({ name: 'reason_type', type: 'enum', enum: ReasonType, nullable: true })
    reasonType: ReasonType;

    @Column({ name: 'note_item' })
    noteItem: string;

    @Column({ name: 'note' })
    note: string;

    @Column({ name: 'qtyItem', nullable: true })
    qtyItem: number;

    @Column({ name: 'inventory_date'})
    inventoryDate: Date; // Menyimpan tanggal inventory

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
      name: 'product_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;

    // @ManyToOne(() => WarehouseEntity)
    // @JoinColumn({
    //     name: 'warehouse_id',
    //     referencedColumnName: 'id',
    //     foreignKeyConstraintName: 'fk_warehouse_id',
    // })
    // warehouse: WarehouseEntity;

    // @ManyToOne(() => UserEntity)
    // @JoinColumn({
    //     name: 'created_by',
    //     referencedColumnName: 'id',
    //     foreignKeyConstraintName: 'fk_user_created_by',
    // })
    // creator: UserEntity;

}
