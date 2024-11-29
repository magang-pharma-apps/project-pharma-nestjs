import { DataSource, In } from 'typeorm';
import { hash } from 'bcrypt';
import config from '../config/ormconfig';
import { PermissionEntity } from '../modules/auth/entities/permission.entity';
import { RoleEntity } from '../modules/auth/entities/role.entity';
import { UserEntity } from '../modules/auth/entities/user.entity';
import { RolePermissionEntity } from '../modules/auth/entities/role_permissions.entity';
import { UserRoleEntity } from '../modules/auth/entities/user_roles.entity';

export async function seedRolePermission() {
  const dataSource = new DataSource(config);

  try {
    await dataSource.initialize();

    const permissionRepository = dataSource.getRepository(PermissionEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);
    const userRepository = dataSource.getRepository(UserEntity);

    const rolePermissionRepository =
      dataSource.getRepository(RolePermissionEntity);
    const userRoleRepository = dataSource.getRepository(UserRoleEntity);

    // admin role will get all permissions
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
        name: 'read:unit', 
        description: 'Permission to read unit data',
      },
      { 
        name: 'create:unit', 
        description: 'Permission to create unit data',
      },
      { 
        name: 'update:unit', 
        description: 'Permission to update unit data',
      },
      { 
        name: 'delete:unit', 
        description: 'Permission to delete unit data',
      },

      { 
        name: 'read:product', 
        description: 'Permission to read product data'
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

      {
        name: 'read:product image',
        description: 'Permission to read product image data',
      },
      {
        name: 'create:product image',
        description: 'Permission to create product image data',
      },
      {
        name: 'update:product image',
        description: 'Permission to update product image data',
      },
      {
        name: 'delete:product image',
        description: 'Permission to delete product image data',
      },

      {
        name: 'read:compound product',
        description: 'Permission to read compound product data',
      },
      {
        name: 'create:compound product',
        description: 'Permission to create compound product data',
      },
      {
        name: 'update:compound product',
        description: 'Permission to update compound product data',
      },
      {
        name: 'delete:compound product',
        description: 'Permission to delete compound product data',
      },

      {
        name: 'read:supplier',
        description: 'Permission to read supplier data',
      },
      {
        name: 'create:supplier',
        description: 'Permission to create supplier data',
      },
      {
        name: 'update:supplier',
        description: 'Permission to update supplier data',
      },
      {
        name: 'delete:supplier',
        description: 'Permission to delete supplier data',
      },

      {
        name: 'read:warehouse',
        description: 'Permission to read warehouse data',
      },
      {
        name: 'create:warehouse',
        description: 'Permission to create warehouse data',
      },
      {
        name: 'update:warehouse',
        description: 'Permission to update warehouse data',
      },
      {
        name: 'delete:warehouse',
        description: 'Permission to delete warehouse data',
      },

      { 
        name: 'read:inventory', 
        description: 'Permission to read inventory data',
      },
      {
        name: 'create:inventory',
        description: 'Permission to create inventory data',
      },
      {
        name: 'update:inventory',
        description: 'Permission to update inventory data',
      },
      {
        name: 'delete:inventory',
        description: 'Permission to delete inventory data',
      },

      {
        name: 'read:transaction',
        description: 'Permission to read transaction data',
      },
      {
        name: 'create:transaction',
        description: 'Permission to create transaction data',
      },
      {
        name: 'update:transaction',
        description: 'Permission to update transaction data',
      },
      {
        name: 'delete:transaction',
        description: 'Permission to delete transaction data',
      },
    ];

    // Roles data
    const roles = [
      { 
        name: 'Admin', 
        description: 'Administrator role with full access',
      },
      { 
        name: 'User', 
        description: 'Standard user role with limited access',
      },
      {
        name: 'Admin_Gudang',
        description: 'Standard user role with limited access',
      },
      { 
        name: 'Apoteker', 
        description: 'Standard user role with limited access',
      }

    ];

    // Users data
    const users = [
      { username: 'admin', 
        email: 'admin@example.com', 
        password: 'admin123',
      },
      { username: 'user', 
        email: 'user@example.com', 
        password: 'user123',
      },
      {
        username: 'admin_gudang',
        email: 'gudang@example.com',
        password: 'admingudang123',
      },
      {
        username: 'apoteker',
        email: 'apoteker@example.com',
        password: 'apoteker123',
      }

    ];

    // Fetch existing permissions and roles in one query
    const existingPermissions = await permissionRepository.find();
    const existingRoles = await roleRepository.find();

    // Convert fetched permissions/roles to maps for faster lookup
    const existingPermissionMap = new Map(
      existingPermissions.map((p) => [p.name, p]),
    );
    const existingRoleMap = new Map(existingRoles.map((r) => [r.name, r]));

    // Insert permissions (skip duplicates)
    for (const permissionData of permissions) {
      if (!existingPermissionMap.has(permissionData.name)) {
        const newPermission = permissionRepository.create(permissionData);
        await permissionRepository.save(newPermission);
        console.log(`Permission ${permissionData.name} created`);
      } else {
        console.log(`Permission ${permissionData.name} already exists`);
      }
    }

    // Insert roles (skip duplicates)
    for (const roleData of roles) {
      if (!existingRoleMap.has(roleData.name)) {
        const newRole = roleRepository.create(roleData);
        await roleRepository.save(newRole);
        console.log(`Role ${roleData.name} created`);
      } else {
        console.log(`Role ${roleData.name} already exists`);
      }
    }

    // Insert users with encrypted passwords
    for (const userData of users) {
      let user = await userRepository.findOneBy({ email: userData.email });
      if (!user) {
        const hashedPassword = await hash(userData.password, 12);
        user = userRepository.create({ ...userData, password: hashedPassword });
        await userRepository.save(user);
        console.log(`User ${userData.email} created`);
      } else {
        console.log(`User ${userData.email} already exists`);
      }
    }

    // Assign permissions to Admin role
    const adminRole =
      existingRoleMap.get('Admin') ||
      (await roleRepository.findOneBy({ name: 'Admin' }));

    const userRole =
      existingRoleMap.get('User') ||
      (await roleRepository.findOneBy({ name: 'User' }));

    const allPermissions = await permissionRepository.find({
      where: { name: In(permissions.map((p) => p.name)) },
    });

    const existingRolePermissions = await rolePermissionRepository.findBy({
      role: adminRole,
    });

    const existingRolePermissionMap = new Map(
      existingRolePermissions.map((rp) => [rp.permission.name, rp]),
    );

    if (adminRole) {
      for (const permission of allPermissions) {
        if (!existingRolePermissionMap.has(permission.name)) {
          await rolePermissionRepository.save({ role: adminRole, permission });
          console.log(`Permission ${permission.name} assigned to Admin role`);
        }
      }
    }

    // Assign roles to users
    const adminUser = await userRepository.findOneBy({
      email: 'admin@example.com',
    });
    const normalUser = await userRepository.findOneBy({
      email: 'user@example.com',
    });

    if (adminUser && adminRole) {
      const existingAdminUserRole = await userRoleRepository.findOne({
        where: { user: adminUser, role: adminRole },
      });
      if (!existingAdminUserRole) {
        await userRoleRepository.save({ user: adminUser, role: adminRole });
        console.log('Admin user role assigned');
      } else {
        console.log('Admin user already has the Admin role');
      }
    }

    if (normalUser && adminRole) {
      const existingNormalUserRole = await userRoleRepository.findOne({
        where: { user: normalUser, role: userRole },
      });
      if (!existingNormalUserRole) {
        await userRoleRepository.save({ user: normalUser, role: userRole });
        console.log('Normal user role assigned');
      } else {
        console.log('Normal user already has the Admin role');
      }
    }

    // Assign permissions to Admin Gudang role
    const permissionGudang = [
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
        name: 'read:unit', 
        description: 'Permission to read unit data',
      },
      { 
        name: 'create:unit', 
        description: 'Permission to create unit data',
      },
      { 
        name: 'update:unit', 
        description: 'Permission to update unit data',
      },
      { 
        name: 'delete:unit', 
        description: 'Permission to delete unit data',
      },

      { 
        name: 'read:product', 
        description: 'Permission to read product data'
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

      {
        name: 'read:product image',
        description: 'Permission to read product image data',
      },
      {
        name: 'create:product image',
        description: 'Permission to create product image data',
      },
      {
        name: 'update:product image',
        description: 'Permission to update product image data',
      },
      {
        name: 'delete:product image',
        description: 'Permission to delete product image data',
      },

      {
        name: 'read:supplier',
        description: 'Permission to read supplier data',
      },
      {
        name: 'create:supplier',
        description: 'Permission to create supplier data',
      },
      {
        name: 'update:supplier',
        description: 'Permission to update supplier data',
      },
      {
        name: 'delete:supplier',
        description: 'Permission to delete supplier data',
      },

      {
        name: 'read:warehouse',
        description: 'Permission to read warehouse data',
      },
      {
        name: 'create:warehouse',
        description: 'Permission to create warehouse data',
      },
      {
        name: 'update:warehouse',
        description: 'Permission to update warehouse data',
      },
      {
        name: 'delete:warehouse',
        description: 'Permission to delete warehouse data',
      },

      { 
        name: 'read:inventory', 
        description: 'Permission to read inventory data',
      },
      {
        name: 'create:inventory',
        description: 'Permission to create inventory data',
      },
      {
        name: 'update:inventory',
        description: 'Permission to update inventory data',
      },
      {
        name: 'delete:inventory',
        description: 'Permission to delete inventory data',
      },
    ];

    const userRoleGudang =
      existingRoleMap.get('Admin_Gudang') ||
      (await roleRepository.findOneBy({ name: 'Admin_Gudang' }));

    const allPermissionsGudang = await permissionRepository.find({
      where: { name: In(permissionGudang.map((p) => p.name)) },
    });

    const existingRolePermissionsGudang = await rolePermissionRepository.findBy(
      {
        role: userRoleGudang,
      },
    );

    const existingRolePermissionMapGudang = new Map(
      existingRolePermissionsGudang.map((rp) => [rp.permission.name, rp]),
    );

    if (userRoleGudang) {
      for (const permission of allPermissionsGudang) {
        if (!existingRolePermissionMapGudang.has(permission.name)) {
          await rolePermissionRepository.save({
            role: userRoleGudang,
            permission,
          });
          console.log(`Permission ${permission.name} assigned to Admin_Gudang role`);
        }
      }
    }

    const gudangUser = await userRepository.findOneBy({
      email: 'gudang@example.com',
    });

    if (gudangUser && userRoleGudang) {
      const existingGudangUserRole = await userRoleRepository.findOne({
        where: { user: gudangUser, role: userRoleGudang },
      });
      if (!existingGudangUserRole) {
        await userRoleRepository.save({
          user: gudangUser,
          role: userRoleGudang,
        });
        console.log('Admin_Gudang user role assigned');
      } else {
        console.log('Admin_Gudang user already has the Admin_Gudang role');
      }
    }

    const permissionApoteker = [
      {
        name: 'read:compound product',
        description: 'Permission to read compound product data',
      },
    ];

    const userRoleApoteker =
      existingRoleMap.get('Apoteker') ||
      (await roleRepository.findOneBy({ name: 'Apoteker' }));

    const allPermissionsApoteker = await permissionRepository.find({
      where: { name: In(permissionApoteker.map((p) => p.name)) },
    });

    const existingRolePermissionsApoteker = await rolePermissionRepository.findBy(
      {
        role: userRoleApoteker,
      },
    );

    const existingRolePermissionMapApoteker = new Map(
      existingRolePermissionsApoteker.map((rp) => [rp.permission.name, rp]),
    );

    if (userRoleApoteker) {
      for (const permission of allPermissionsApoteker) {
        if (!existingRolePermissionMapApoteker.has(permission.name)) {
          await rolePermissionRepository.save({
            role: userRoleApoteker,
            permission,
          });
          console.log(`Permission ${permission.name} assigned to Apoteker role`);
        }
      }
    }

    const apotekerUser = await userRepository.findOneBy({
      email: 'apoteker@example.com',
    });

    if (apotekerUser && userRoleApoteker) {
      const existingApotekerUserRole = await userRoleRepository.findOne({
        where: { user: apotekerUser, role: userRoleApoteker },
      });
      if (!existingApotekerUserRole) {
        await userRoleRepository.save({
          user: apotekerUser,
          role: userRoleApoteker,
        });
        console.log('Apoteker user role assigned');
      } else {
        console.log('Apoteker user already has the Apoteker role');
      }
    }

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await dataSource.destroy();
  }
}
