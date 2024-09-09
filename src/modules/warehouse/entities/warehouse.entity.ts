import { BaseEntity } from "src/config/common/BaseEntity";
import { InventoryEntity } from "src/modules/inventories/entities/inventory.entity";
import { 
    Column, 
    DeleteDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('warehouses')
export class WarehouseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'boolean', default: false })
    status: boolean;

    @Column({ nullable: true })
    description: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @OneToMany(() => InventoryEntity, (inventory) => inventory.warehouse)
    inventories: InventoryEntity[];
}
