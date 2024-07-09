import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEntity } from '../entities/user-role..entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  async findAll() {
    const userRoles = await this.userRoleRepository.find();

    return userRoles;
  }

  async findOne(id: string) {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
    });

    return userRole;
  }

  async create(createUserRoleDto: any) {
    const newUserRole = await this.userRoleRepository.save(createUserRoleDto);

    return newUserRole;
  }

  async update(id: string, updateUserRoleDto: any) {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
    });

    if (!userRole) {
      throw new NotFoundException('User Role not found');
    }

    await this.userRoleRepository.update(id, updateUserRoleDto);

    return await this.userRoleRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
    });

    if (!userRole) {
      throw new NotFoundException('User Role not found');
    }

    await this.userRoleRepository.delete(id);

    return userRole;
  }
}
