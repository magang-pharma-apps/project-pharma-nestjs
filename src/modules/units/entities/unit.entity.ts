import { BaseEntity } from "src/config/common/BaseEntity";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { 
    Column,  
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity("units")
export class UnitEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    // @Column({ name: 'status', type: 'boolean', default: false })
    // status: boolean;

    @OneToMany(() => ProductEntity, (product) => product.unit)
    products: ProductEntity[];
}
