import { BaseEntity } from "src/config/common/BaseEntity";
import { UserEntity } from "src/modules/auth/entities/user.entity";
// import { UserEntity } from "src/modules/auth/entities/user.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { WarehouseEntity } from "src/modules/warehouse/entities/warehouse.entity";
import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('inventories')
export class InventoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id' })
    productId: number;
    
    @Column ({ name: 'warehouse_id' })
    warehouseId: number

    @Column({ name: 'quantity_in_stock' })
    quantityInStock: number;

    @Column({ name: 'note' })
    note: string;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({
      name: 'product_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_product_id',
    })
    product: ProductEntity;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({
        name: 'warehouse_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_warehouse_id',
    })
    warehouse: WarehouseEntity;

    // @ManyToOne(() => UserEntity)
    // @JoinColumn({
    //     name: 'created_by',
    //     referencedColumnName: 'id',
    //     foreignKeyConstraintName: 'fk_user_created_by',
    // })
    // creator: UserEntity;

}
