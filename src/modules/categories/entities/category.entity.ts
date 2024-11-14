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

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'image_url', type: 'varchar' })
  categoryImageUrl: string;

  @Column({ name: 'local_image_path', type: 'varchar', nullable: true })
  localImagePath: string; // Path untuk gambar yang disimpan secara fisik

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
