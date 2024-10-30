import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { PrescriptionRedemptionsService } from './prescription_redemptions.service';
import { CreatePrescriptionRedemptionDto } from './dto/create-prescription_redemption.dto';
import { UpdatePrescriptionRedemptionDto } from './dto/update-prescription_redemption.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Prescription Redemptions')
@Controller('prescription-redemptions')
export class PrescriptionRedemptionsController {
  constructor(private readonly prescriptionRedemptionsService: PrescriptionRedemptionsService) {}

  @Post()
  create(@Body() createPrescriptionRedemptionDto: CreatePrescriptionRedemptionDto) {
    return this.prescriptionRedemptionsService.create(createPrescriptionRedemptionDto);
  }

  @Get()
  findAll() {
    return this.prescriptionRedemptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionRedemptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionRedemptionDto: UpdatePrescriptionRedemptionDto) {
    return this.prescriptionRedemptionsService.update(+id, updatePrescriptionRedemptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionRedemptionsService.remove(+id);
  }
}
