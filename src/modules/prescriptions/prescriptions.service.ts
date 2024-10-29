import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Repository } from 'typeorm';
import { PrescriptionEntity } from './entities/prescription.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepository: Repository<PrescriptionEntity>,
  ) {}

  async create(data: CreatePrescriptionDto) {
    const prescription = this.prescriptionRepository.create(data);

    return await this.prescriptionRepository.save(prescription);
  }

  async findAll() {
    const prescription = await this.prescriptionRepository.find({
      where: {
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['doctor', 'customer'],
      select: {
        id: true,
        prescriptionCode: true,
        prescriptions: true,
        prescriptionDate: true,
        doctor: {
          name: true,
          status: true,
        },
        customer: {
          name: true,
          status: true,
        },
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    return prescription;
  }

  async findOne(id: number) {
    const prescription = this.prescriptionRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      relations: ['doctor', 'customer'],
      select: {
        id: true,
        prescriptionCode: true,
        prescriptions: true,
        prescriptionDate: true,
        doctor: {
          name: true,
          status: true,
        },
        customer: {
          name: true,
          status: true,
        },
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');    
    }

    return prescription;
  }

  async update(id: number, data: UpdatePrescriptionDto) {
    const prescription = await this.prescriptionRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    Object.assign(prescription, data);

    const updatedPrescription = await this.prescriptionRepository.save(prescription);

    return updatedPrescription;
  }

  async remove(id: number) {
    const prescription = await this.prescriptionRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    const deletedPrescription = await this.prescriptionRepository.softRemove(prescription);

    return deletedPrescription;
  }
}
