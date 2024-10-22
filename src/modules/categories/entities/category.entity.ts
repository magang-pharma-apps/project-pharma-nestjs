import { BaseEntity } from 'src/config/common/BaseEntity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  categoryImageUrl: string;

  @Column({ name: 'local_image_path', type: 'varchar', nullable: true })
  localImagePath: string; // Path untuk gambar yang disimpan secara fisik

  // @Column({ name: 'status', type: 'boolean', default: false })
  // status: boolean;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
