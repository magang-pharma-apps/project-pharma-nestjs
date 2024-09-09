import { BaseEntity } from 'src/config/common/BaseEntity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column( { default: true})
  status: boolean;


  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

}
