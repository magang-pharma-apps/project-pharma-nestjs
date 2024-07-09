import { BaseEntity } from 'src/config/common/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

@Entity('user_role')
export class UserRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.userRoles)
  role: RoleEntity;

  @Column({ default: true })
  isActive: boolean;
}
