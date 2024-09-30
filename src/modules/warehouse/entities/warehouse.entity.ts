import { BaseEntity } from "src/config/common/BaseEntity";
import { InventoryEntity } from "src/modules/inventories/entities/inventory.entity";
import { SupplierEntity } from "src/modules/suppliers/entities/supplier.entity";
import { 
    Column, 
    DeleteDateColumn, 
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

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    location: string;

    @Column({ name: 'status', type: 'boolean', default: false })
    status: boolean;

    @Column ({ name: 'supplier_id' })
    supplierId: number

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @OneToMany(() => InventoryEntity, (inventory) => inventory.warehouse)
    inventories: InventoryEntity[];

    @ManyToOne(() => SupplierEntity)
    @JoinColumn({
      name: 'supplier_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_supplier_id',
    })
    supplier: SupplierEntity;
}
