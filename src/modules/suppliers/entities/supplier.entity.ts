import { BaseEntity } from "src/config/common/BaseEntity";
import { WarehouseEntity } from "src/modules/warehouse/entities/warehouse.entity";
import { 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity('suppliers')
export class SupplierEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name'})
  name: string;

  @Column({ name: 'contact_number' })
  contactNumber: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'address' })
  address: string;

  @OneToMany(() => WarehouseEntity, (warehouse) => warehouse.supplier)
  warehouse: WarehouseEntity[];
}
