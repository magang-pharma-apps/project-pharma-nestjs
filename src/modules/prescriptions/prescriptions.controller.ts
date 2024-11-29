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
  NotFoundException
} from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { PrescriptionDtoOut } from './dto/prescription.dto';

@ApiTags('Prescriptions')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Prescription data',
    type: CreatePrescriptionDto,
  })

  // @Permission('create:prescription')
  @Post()
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    const prescription = await this.prescriptionsService.create(createPrescriptionDto);

    return new ResponseFormatter(prescription, 'Prescription created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prescriptions data',
    type: PrescriptionDtoOut,
  })

  // @Permission('read:prescription')
  @Get()
  async findAll() {
    const prescription = await this.prescriptionsService.findAll();

    if (!prescription) {
      return new NotFoundException('Prescriptions not found');
    }

    return new ResponseFormatter(prescription, 'Prescriptions');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prescription data',
    type: PrescriptionDtoOut,
  })

  // @Permission('read:prescription')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const prescription = await this.prescriptionsService.findOne(+id);

    if (!prescription) {
      return new NotFoundException('Prescription not found');
    }

    return new ResponseFormatter(prescription, 'Prescription');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Prescription data',
    type: UpdatePrescriptionDto,
  })

  // @Perission('update:prescription')
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    const prescription = await this.prescriptionsService.update(+id, updatePrescriptionDto);

    if (!prescription) {
      return new NotFoundException('Prescription not found');
    }

    return new ResponseFormatter(prescription, 'Prescription updated');
  }

  // @Permission('delete:prescription')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const prescription = await this.prescriptionsService.remove(+id);

    if (!prescription) {
      return new NotFoundException('Prescription not found');
    }

    return new ResponseFormatter(prescription, 'Prescription deleted');
  }
}
