import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionRedemptionDto } from './dto/create-prescription_redemption.dto';
import { UpdatePrescriptionRedemptionDto } from './dto/update-prescription_redemption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionRedemptionEntity } from './entities/prescription_redemption.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrescriptionRedemptionsService {
  constructor(
    @InjectRepository(PrescriptionRedemptionEntity)
    private readonly prescriptionRedemptionRepository: Repository<PrescriptionRedemptionEntity>,
  ) {}

  async create(data: CreatePrescriptionRedemptionDto) {
    const prescriptionRedemption = this.prescriptionRedemptionRepository.create(data);

    return await this.prescriptionRedemptionRepository.save(prescriptionRedemption);
  }

  findAll() {
    const prescriptionRedemptions = this.prescriptionRedemptionRepository.find({
      where: {
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['prescription', 'product'],
      select: {
        id: true,
        price: true,
        prescription: {
          id: true,
          prescriptionCode: true,
          prescriptionDate: true,
          isRedeem: true,
          doctor: {
            name: true,
            status: true,
          },
          customer: {
            name: true,
            age: true,
            status: true,
          },
        },
        product:{
          id: true,
          name: true,
          purchasePrice: true,
          sellingPrice: true,
          expiryDate: true,
          productImageUrl: true,
          drugClass: true,
          category: {
            name: true,
            status: true,
          },
          unit: {
            name: true,
            status: true,
          },
        },
      },
    });

    if (!prescriptionRedemptions) {
      throw new NotFoundException('PrescriptionRedemption not found');
    }

    return prescriptionRedemptions;
  }

  findOne(id: number) {
    const prescriptionRedemption = this.prescriptionRedemptionRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['prescription', 'product'],
      select: {
        id: true,
        price: true,
        prescription: {
          id: true,
          prescriptionCode: true,
          prescriptionDate: true,
          isRedeem: true,
          doctor: {
            name: true,
            status: true,
          },
          customer: {
            name: true,
            age: true,
            status: true,
          },
        },
        product:{
          id: true,
          name: true,
          purchasePrice: true,
          sellingPrice: true,
          expiryDate: true,
          productImageUrl: true,
          drugClass: true,
          category: {
            name: true,
            status: true,
          },
          unit: {
            name: true,
            status: true,
          },
        },
      },
    });

    if (!prescriptionRedemption) {
      throw new NotFoundException('PrescriptionRedemption not found');
    }

    return prescriptionRedemption;
  }

  async update(id: number, data: UpdatePrescriptionRedemptionDto) {
    const prescriptionRedemption = await this.prescriptionRedemptionRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!prescriptionRedemption) {
      throw new NotFoundException('PrescriptionRedemption not found');
    }

    Object.assign(prescriptionRedemption, data);      

    const updatedPrescriptionRedemption = await this.prescriptionRedemptionRepository.save(prescriptionRedemption);

    return updatedPrescriptionRedemption;
  }

  async remove(id: number) {
    const prescriptionRedemption = await this.prescriptionRedemptionRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });

    if (!prescriptionRedemption) {
      throw new NotFoundException('PrescriptionRedemption not found');
    }

    const deletedPrescriptionRedemption = await this.prescriptionRedemptionRepository.softRemove(prescriptionRedemption);

    return deletedPrescriptionRedemption;
  }
}
