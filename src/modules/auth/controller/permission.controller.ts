import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreatePermissionDto, PermissionDto } from '../dto/permission.dto';
import { PermissionService } from '../service/permission.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';

@ApiTags('Roles and Permissions')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiResponse({
    status: 200,
    description: 'Permissions data',
    type: PermissionDto,
  })
  @Get()
  async findAll() {
    const roles = await this.permissionService.findAll();

    return new ResponseFormatter(roles, 'Roles found');
  }

  @ApiResponse({
    status: 200,
    description: 'Permissions data',
    type: CreatePermissionDto,
  })
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    const role = await this.permissionService.create(createPermissionDto);

    return new ResponseFormatter(role, 'Role created');
  }

  @ApiResponse({
    status: 200,
    description: 'Permissions data',
    type: PermissionDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.permissionService.findOne(id);

    return new ResponseFormatter(role, 'Role found');
  }
}
