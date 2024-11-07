import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionRedemptionDto } from './dto/create-prescription_redemption.dto';
import { UpdatePrescriptionRedemptionDto } from './dto/update-prescription_redemption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionRedemptionEntity } from './entities/prescription_redemption.entity';
import { Repository } from 'typeorm';
import { TransactionDetailEntity } from '../transaction_details/entities/transaction_detail.entity';
import { PrescriptionEntity } from '../prescriptions/entities/prescription.entity';

@Injectable()
export class PrescriptionRedemptionsService {
  constructor(
    @InjectRepository(PrescriptionRedemptionEntity)
    private readonly prescriptionRedemptionRepository: Repository<PrescriptionRedemptionEntity>,

    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepository: Repository<PrescriptionEntity>,
  ) {}

  // async create(data: CreatePrescriptionRedemptionDto) {
  //   const prescriptionRedemption = this.prescriptionRedemptionRepository.create(data);

  //   return await this.prescriptionRedemptionRepository.save(prescriptionRedemption);
  // }

  // Metode untuk memperbarui status isRedeem pada Prescription
  async updatePrescriptionRedeemStatus(prescriptionId: number, isRedeem: boolean): Promise<void> {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id: prescriptionId },
    });

    if (prescription) {
      prescription.isRedeem = isRedeem;  // Perbarui status isRedeem
      await this.prescriptionRepository.save(prescription);  // Simpan perubahan
    } else {
      throw new Error('Prescription not found');
    }
  }

  async create(data: CreatePrescriptionRedemptionDto) {
    const { isRedeem, prescriptionId } = data;

    // Jika isRedeem = true, update status isRedeem di Prescription
    if (isRedeem) {
      await this.updatePrescriptionRedeemStatus(prescriptionId, true);
    }

    // Membuat entitas PrescriptionRedemption dengan transaksi tunggal
    const prescriptionRedemption = this.prescriptionRedemptionRepository.create({
      prescriptionId: data.prescriptionId,
      // price: data.price,
      isPaid: data.isPaid,
      isRedeem: data.isRedeem,
      transaction: {
          userId: data.transaction.userId,
          transactionDate: data.transaction.transactionDate,
          transactionType: data.transaction.transactionType,
          categoryType: data.transaction.categoryType,
          note: data.transaction.note,
          tax: data.transaction.tax,
          subTotal: data.transaction.subTotal,
          grandTotal: data.transaction.grandTotal,
          paymentMethod: data.transaction.paymentMethod,
          redemptionId: data.transaction.redemptionId,
          // Membuat items untuk transaksi
          items: data.transaction.items.map(itemData => {
            const item = new TransactionDetailEntity();
            item.productId = itemData.productId;
            item.quantity = itemData.quantity;
            item.note = itemData.note;
            return item;
          }),
      },
    });
  
    // Simpan PrescriptionRedemption beserta transaksi dan item
    return await this.prescriptionRedemptionRepository.save(prescriptionRedemption);
    
  }  

  async findAll() {
    const prescriptionRedemptions = await this.prescriptionRedemptionRepository.find({
      where: {
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['prescription', 'prescription.doctor', 'prescription.customer', 'prescription.customer', 'transaction', 'transaction.items', 'transaction.items.product'],
      select: {
        id: true,
        isPaid: true,
        isRedeem: true,
        prescription: {
          id: true,
          prescriptionCode: true,
          prescriptionDate: true,
          isRedeem: true,
          doctor: {
            id: true,
            name: true,
            status: true,
          },
          customer: {
            id: true,
            name: true,
            age: true,
            status: true,
          },
        },
        transaction: {
          id: true,
          userId: true,
          transactionDate: true,
          transactionType: true,
          categoryType: true,
          note: true,
          tax: true,
          subTotal: true,
          grandTotal: true,
          paymentMethod: true,
          redemptionId: true,
          items: {
            id: true,
            product: {
              id: true,
              name: true,
              status: true,
            },
            quantity: true,
            note: true,
          },
        },
      },
    });

    // Filter the data based on isRedeem condition
    const filteredData = prescriptionRedemptions.filter((prescriptionRedemption) => {
      return prescriptionRedemption.isRedeem === true;
    });

    if (!filteredData || filteredData.length === 0) {
      throw new NotFoundException('No redeemed prescriptions found');
    }

    return filteredData;
  }

  async findOne(id: number) {
    const prescriptionRedemption = await this.prescriptionRedemptionRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['prescription', 'prescription.doctor', 'prescription.customer', 'prescription.customer', 'transaction', 'transaction.items', 'transaction.items.product'],
      select: {
        id: true,
        isPaid: true,
        isRedeem: true,
        prescription: {
          id: true,
          prescriptionCode: true,
          prescriptionDate: true,
          isRedeem: true,
          doctor: {
            id: true,
            name: true,
            status: true,
          },
          customer: {
            id: true,
            name: true,
            age: true,
            status: true,
          },
          
        },
        transaction: {
          id: true,
          userId: true,
          transactionDate: true,
          transactionType: true,
          categoryType: true,
          note: true,
          tax: true,
          subTotal: true,
          grandTotal: true,
          paymentMethod: true,
          redemptionId: true,
          items: {
            id: true,
            product: {
              id: true,
              name: true,
              status: true,
            },
            quantity: true,
            note: true,
          },
        },
      },
    });

    if (!prescriptionRedemption || prescriptionRedemption.isRedeem === false) {
      throw new NotFoundException('Redeemed prescription not found');
    }

    return prescriptionRedemption;
  }

  async update(id: number, data: UpdatePrescriptionRedemptionDto) {
    // Temukan PrescriptionRedemption berdasarkan ID
    const prescriptionRedemption = await this.prescriptionRedemptionRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      relations: ['prescription'], // Pastikan kita mendapatkan relasi ke Prescription
    });
  
    if (!prescriptionRedemption) {
      throw new NotFoundException('PrescriptionRedemption not found');
    }
  
    // Jika ada isRedeem pada data yang diterima, update Prescription
    if (data.isRedeem !== undefined) {
      const prescription = prescriptionRedemption.prescription; // Ambil Prescription terkait
      prescription.isRedeem = data.isRedeem;  // Update isRedeem
      await this.prescriptionRepository.save(prescription);  // Simpan perubahan ke Prescription
    }
  
    // Terapkan perubahan lainnya pada PrescriptionRedemption
    Object.assign(prescriptionRedemption, data);
  
    // Simpan PrescriptionRedemption yang telah diperbarui
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
