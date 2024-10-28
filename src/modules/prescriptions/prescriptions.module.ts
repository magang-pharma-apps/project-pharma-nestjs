import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from './entities/prescription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionEntity])],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
})
export class PrescriptionsModule {}
