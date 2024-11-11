import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionRedemptionDto } from './dto/create-prescription_redemption.dto';
import { UpdatePrescriptionRedemptionDto } from './dto/update-prescription_redemption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionRedemptionEntity } from './entities/prescription_redemption.entity';
import { Repository } from 'typeorm';
import { TransactionDetailEntity } from '../transaction_details/entities/transaction_detail.entity';
import { PrescriptionEntity } from '../prescriptions/entities/prescription.entity';
import { TransactionEntity } from '../transactions/entities/transaction.entity';

@Injectable()
export class PrescriptionRedemptionsService {
  constructor(
    @InjectRepository(PrescriptionRedemptionEntity)
    private readonly prescriptionRedemptionRepository: Repository<PrescriptionRedemptionEntity>,

    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepository: Repository<PrescriptionEntity>,

    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>
  ) {}

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

    const transactionRedeem = this.transactionRepository.create({
      userId: data.transaction.userId,
          transactionDate: data.transaction.transactionDate,
          transactionType: data.transaction.transactionType,
          categoryType: data.transaction.categoryType,
          note: data.transaction.note,
          tax: data.transaction.tax,
          subTotal: data.transaction.subTotal,
          grandTotal: data.transaction.grandTotal,
          paymentMethod: data.transaction.paymentMethod,
          // Membuat items untuk transaksi
          items: data.transaction.items.map(itemData => {
            const item = new TransactionDetailEntity();
            item.productId = itemData.productId;
            item.quantity = itemData.quantity;
            item.note = itemData.note;
            return item;
          }),

    })

    await this.transactionRepository.save(transactionRedeem);

    const prescriptionRedemption = this.prescriptionRedemptionRepository.create({
      prescriptionId: data.prescriptionId,
      isPaid: data.isPaid,
      isRedeem: data.isRedeem,
      transactionId: transactionRedeem.id, // mengambil id dari tabel transaksi bukan dari entitas
      transaction: transactionRedeem
    });
  
    // Simpan PrescriptionRedemption beserta transaksi dan item
    return await this.prescriptionRedemptionRepository.save(prescriptionRedemption);
    
  }  

  async findAll() {
    const prescriptionRedemptions = this.prescriptionRedemptionRepository.createQueryBuilder('prescriptionRedemption')
      .leftJoinAndSelect('prescriptionRedemption.prescription', 'prescription')
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('prescription.customer', 'customer')
      .leftJoinAndSelect('prescriptionRedemption.transaction', 'transaction')
      .leftJoinAndSelect('transaction.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .select([
        'prescriptionRedemption.id',
        'prescriptionRedemption.isPaid',
        'prescriptionRedemption.isRedeem',
        'prescription.id',
        'prescription.prescriptionCode',
        'prescription.prescriptionDate',
        'prescription.isRedeem',
        'doctor.name',
        'customer.name',
        'customer.age',
        'transaction.id',
        'transaction.userId',
        'transaction.transactionDate',
        'transaction.transactionType',
        'transaction.categoryType',
        'transaction.note',
        'transaction.tax',
        'transaction.subTotal',
        'transaction.grandTotal',
        'transaction.paymentMethod',
        'items.id',
        'items.quantity',
        'items.note',
        'product.name',
        'product.sellingPrice'
      ])
      .where('prescriptionRedemption.deletedAt IS NULL')
      .andWhere('prescriptionRedemption.isRedeem = true')
      .orderBy('prescriptionRedemption.id', 'DESC');

    const data = await prescriptionRedemptions.getMany(); 
    console.log(data);

    // Konversi sellingPrice menjadi float untuk setiap product dalam items
    data.forEach((prescriptionRedemption) => {
      if (prescriptionRedemption.transaction && prescriptionRedemption.transaction.items) {
        prescriptionRedemption.transaction.items = prescriptionRedemption.transaction.items.map((item) => {
          if (item.product && item.product.sellingPrice) {
            item.product.sellingPrice = parseFloat(item.product.sellingPrice.toString());
          }
          return item;
        });
      }
    });

    return data;
  }

  async findOne(id: number) {
    const prescriptionRedemption = this.prescriptionRedemptionRepository.createQueryBuilder('prescriptionRedemption')
      .leftJoinAndSelect('prescriptionRedemption.prescription', 'prescription')
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('prescription.customer', 'customer')
      .leftJoinAndSelect('prescriptionRedemption.transaction', 'transaction')
      .leftJoinAndSelect('transaction.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .select([
        'prescriptionRedemption.id',
        'prescriptionRedemption.isPaid',
        'prescriptionRedemption.isRedeem',
        'prescription.id',
        'prescription.prescriptionCode',
        'prescription.prescriptionDate',
        'prescription.isRedeem',
        'doctor.name',
        'customer.name',
        'customer.age',
        'transaction.id',
        'transaction.userId',
        'transaction.transactionDate',
        'transaction.transactionType',
        'transaction.categoryType',
        'transaction.note',
        'transaction.tax',
        'transaction.subTotal',
        'transaction.grandTotal',
        'transaction.paymentMethod',
        'items.id',
        'items.quantity',
        'items.note',
        'product.name',
        'product.sellingPrice'

      ])
      .where('prescriptionRedemption.id = :id', { id })
      .andWhere('prescriptionRedemption.deletedAt IS NULL')
      .andWhere('prescriptionRedemption.isRedeem = true')
      .orderBy('prescriptionRedemption.id', 'DESC');

    const data = await prescriptionRedemption.getOne();
    console.log(data);

    // Konversi sellingPrice menjadi float untuk setiap product dalam items
    if (data.transaction && data.transaction.items) {
      data.transaction.items = data.transaction.items.map((item) => {
        if (item.product && item.product.sellingPrice) {
          item.product.sellingPrice = parseFloat(item.product.sellingPrice.toString());
        }
        return item;
      });
    }

    return data;

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
  
    // Jika ada isRedeem pada data yang diterima, update Prescription
    if (data.isRedeem !== undefined) {
      const prescription = prescriptionRedemption.prescription; // Ambil Prescription terkait
      prescription.isRedeem = data.isRedeem;  // Update isRedeem
      await this.prescriptionRepository.save(prescription);  // Simpan perubahan ke Prescription
    }
  
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
function getOne() {
  throw new Error('Function not implemented.');
}

