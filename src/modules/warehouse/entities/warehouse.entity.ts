import { BaseEntity } from "src/config/common/BaseEntity";
import { InventoryEntity } from "src/modules/inventories/entities/inventory.entity";
import { SupplierEntity } from "src/modules/suppliers/entities/supplier.entity";
import { 
    Column,  
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('warehouses')
export class WarehouseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', unique: true })
    name: string;

    @Column({ name: 'location' })
    location: string;

    @Column ({ name: 'supplier_id', nullable: true })
    supplierId: number;

    @ManyToOne(() => SupplierEntity)
    @JoinColumn({
      name: 'supplier_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_supplier_id',
    })
    supplier: SupplierEntity;

    @OneToMany(() => InventoryEntity, (inventory) => inventory.warehouse)
    inventories: InventoryEntity[];
}
