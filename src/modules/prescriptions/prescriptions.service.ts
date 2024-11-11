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
    const prescriptions = await this.prescriptionRepository.createQueryBuilder('prescription')
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('prescription.customer', 'customer')
      .select([
        'prescription.id',
        'prescription.prescriptionCode',
        'prescription.prescriptions',
        'prescription.prescriptionDate',
        'prescription.isRedeem',
        'doctor.name',
        'doctor.status',
        'customer.name',
        'customer.age',
        'customer.status',
      ])
      .where('prescription.deletedAt IS NULL')
      .orderBy('prescription.isRedeem', 'ASC');

    const data = await prescriptions.getMany();
    console.log(data);

    return data;
  }

  async findOne(prescription_id: number) {
    const prescription = await this.prescriptionRepository.createQueryBuilder('prescription')
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('prescription.customer', 'customer')
      .select([
        'prescription.id',
        'prescription.prescriptionCode',
        'prescription.prescriptions',
        'prescription.prescriptionDate',
        'prescription.isRedeem',
        'doctor.name',
        'doctor.status',
        'customer.name',
        'customer.age',
        'customer.status',
      ])
      .where('prescription.deletedAt IS NULL')
      .andWhere('prescription.id = :id', { id: prescription_id })
      .orderBy('prescription.id', 'DESC');

    const data = await prescription.getOne();
    console.log(data);

    return data;
  }

  async update(prescription_id: number, data: UpdatePrescriptionDto) {
    const prescription = await this.prescriptionRepository.findOne({
      where: {
        id: prescription_id,
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

  async remove(prescription_id: number) {
    const prescription = await this.prescriptionRepository.findOne({
      withDeleted: true,
      where: {
        id: prescription_id,
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    const deletedPrescription = await this.prescriptionRepository.softRemove(prescription);

    return deletedPrescription;
  }
}
