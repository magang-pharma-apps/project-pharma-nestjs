import { DataSource } from 'typeorm';
import { PermissionEntity } from '../modules/auth/entities/permission.entity';
import config from '../config/ormconfig';

export async function seedPermissions() {
  const dataSource = new DataSource(config);

  try {
    await dataSource.initialize();

    const permissionRepository = dataSource.getRepository(PermissionEntity);

    const permissions = [
      { 
        name: 'CREATE_USER', 
        description: 'Permission to create user data',
      },
      { 
        name: 'READ_USER', 
        description: 'Permission to read user data',
      },
      {
        name: 'UPDATE_USER',
        description: 'Permission to update user data',
      },
      { 
        name: 'DELETE_USER', 
        description: 'Permission to delete user data',
      },

      { 
        name: 'read:role', 
        description: 'Permission to read role data',
      },
      { 
        name: 'create:role',
        description: 'Permission to create role data',
      },
      { 
        name: 'update:role', 
        description: 'Permission to update role data',
      },
      { 
        name: 'delete:role', 
        description: 'Permission to delete role data',
      },

      {
        name: 'read:permission',
        description: 'Permission to read permission data',
      },
      {
        name: 'create:permission',
        description: 'Permission to create permission data',
      },
      {
        name: 'update:permission',
        description: 'Permission to update permission data',
      },
      {
        name: 'delete:permission',
        description: 'Permission to delete permission data',
      },

      {
        name: 'read:user-role',
        description: 'Permission to read user role data',
      },
      {
        name: 'create:user-role',
        description: 'Permission to create user role data',
      },
      {
        name: 'update:user-role',
        description: 'Permission to update user role data',
      },
      {
        name: 'delete:user-role',
        description: 'Permission to delete user role data',
      },

      {
        name: 'read:role-permission',
        description: 'Permission to read role permission data',
      },
      {
        name: 'create:role-permission',
        description: 'Permission to create role permission data',
      },
      {
        name: 'update:role-permission',
        description: 'Permission to update role permission data',
      },
      {
        name: 'delete:role-permission',
        description: 'Permission to delete role permission data',
      },

      {
        name: 'read:category',
        description: 'Permission to read category data',
      },
      {
        name: 'create:category',
        description: 'Permission to create category data',
      },
      {
        name: 'update:category',
        description: 'Permission to update category data',
      },
      {
        name: 'delete:category',
        description: 'Permission to delete category data',
      },

      { 
        name: 'read:product', 
        description: 'Permission to read product data',
      },
      {
        name: 'create:product',
        description: 'Permission to create product data',
      },
      {
        name: 'update:product',
        description: 'Permission to update product data',
      },
      {
        name: 'delete:product',
        description: 'Permission to delete product data',
      },
    ];

    for (const permissionData of permissions) {
      let permission = await permissionRepository.findOneBy({
        name: permissionData.name,
      });
      if (!permission) {
        permission = permissionRepository.create(permissionData);
        await permissionRepository.save(permission);
        console.log(`Permission ${permissionData.name} created`);
      } else {
        console.log(`Permission ${permissionData.name} already exists`);
      }
    }

    console.log('Permissions seeded successfully!');
  } catch (error) {
    console.error('Error seeding permissions:', error);
  } finally {
    await dataSource.destroy();
  }
}
