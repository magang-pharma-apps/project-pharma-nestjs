import { PartialType } from '@nestjs/swagger';
import { CreatePrescriptionRedemptionDto } from './create-prescription_redemption.dto';

export class UpdatePrescriptionRedemptionDto extends PartialType(CreatePrescriptionRedemptionDto) {}
