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
import { PrescriptionRedemptionsService } from './prescription_redemptions.service';
import { CreatePrescriptionRedemptionDto } from './dto/create-prescription_redemption.dto';
import { UpdatePrescriptionRedemptionDto } from './dto/update-prescription_redemption.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { PrescriptionRedemptionDtoOut } from './dto/prescription_redemption.dto';

@ApiTags('Prescription Redemptions')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('prescription-redemptions')
export class PrescriptionRedemptionsController {
  constructor(
    private readonly prescriptionRedemptionsService: PrescriptionRedemptionsService
  ) {}

  @Post()
  async create(@Body() createPrescriptionRedemptionDto: CreatePrescriptionRedemptionDto) {
    const { isRedeem, prescriptionId } = createPrescriptionRedemptionDto;

    // Jika isRedeem = true, update status isRedeem di Prescription
    if (isRedeem) {
      await this.prescriptionRedemptionsService.updatePrescriptionRedeemStatus(prescriptionId, true);
    }

    // Panggil service untuk memproses data redemption
    return this.prescriptionRedemptionsService.create(createPrescriptionRedemptionDto);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'PrescriptionRedemption data',
    type: PrescriptionRedemptionDtoOut,
  })

  @Get()
  async findAll() {
    const prescriptionRedemptions = await this.prescriptionRedemptionsService.findAll();

    if (!prescriptionRedemptions) {
      return new NotFoundException('PrescriptionRedemptions not found');
    }

    return new ResponseFormatter(prescriptionRedemptions, 'PrescriptionRedemptions found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'PrescriptionRedemption data',
    type: PrescriptionRedemptionDtoOut,
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const prescriptionRedemption = await this.prescriptionRedemptionsService.findOne(+id);

    if (!prescriptionRedemption) {
      return new NotFoundException('PrescriptionRedemption not found');
    }

    return new ResponseFormatter(prescriptionRedemption, 'PrescriptionRedemption found');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
     @Body() updatePrescriptionRedemptionDto: UpdatePrescriptionRedemptionDto) {
    const prescriptionRedemption = await this.prescriptionRedemptionsService.update(+id, updatePrescriptionRedemptionDto);

    if (!prescriptionRedemption) {
      return new NotFoundException('PrescriptionRedemption not found');
    }

    return new ResponseFormatter(prescriptionRedemption, 'PrescriptionRedemption updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const prescriptionRedemption = await this.prescriptionRedemptionsService.remove(+id);

    if (!prescriptionRedemption) {
      return new NotFoundException('PrescriptionRedemption not found');
    }

    return new ResponseFormatter(prescriptionRedemption, 'PrescriptionRedemption deleted');
  }
}
