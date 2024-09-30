import { BaseEntity } from "src/config/common/BaseEntity";
import { InventoryEntity } from "src/modules/inventories/entities/inventory.entity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { WarehouseEntity } from "src/modules/warehouse/entities/warehouse.entity";
import { 
    Column, 
    DeleteDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('suppliers')
export class SupplierEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'contact_number' })
  contactNumber: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'address' })
  address: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  // @OneToMany(() => ProductEntity, (product) => product.supplier)
  // products: ProductEntity[];

  @OneToMany(() => WarehouseEntity, (warehouse) => warehouse.supplier)
  warehouse: WarehouseEntity[];
}
