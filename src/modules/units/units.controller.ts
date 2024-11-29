import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { UnitDtoOut } from './dto/unit.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';

@ApiTags('Unit')
@ApiBearerAuth('accessToken')
@Controller('units')
@UseGuards(AuthGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Unit data',
    type: CreateUnitDto,
  })

  // @Permission('create:unit')
  @Post()
  async create(@Body() createUnitDto: CreateUnitDto) {
    const unit = await this.unitsService.create(createUnitDto);

    return new ResponseFormatter(unit, 'Unit created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Unit data',
    type: UnitDtoOut,
  })

  @Permission('read:unit')
  @Get()
  async findAll() {
    const units = await this.unitsService.findAll();

    return new ResponseFormatter(units, 'Units found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Unit data',
    type: UnitDtoOut,
  })

  // @Permission('read:unit')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const unit = await this.unitsService.findOne(+id);

    return new ResponseFormatter(unit, 'Unit found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Unit data',
    type: UpdateUnitDto,
  })

  // @Permission('update:unit')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto
) {
    const unit = await this.unitsService.update(
      +id, 
      updateUnitDto,
    );

    return new ResponseFormatter(unit, 'Unit updated');
  }

  // @Permission('delete:unit')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const unit = await this.unitsService.remove(+id);

    return new ResponseFormatter(unit, 'Unit deleted');
  }
}
