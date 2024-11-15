import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardStockEntryDto } from './dto/create-card_stock_entry.dto';
import { UpdateCardStockEntryDto } from './dto/update-card_stock_entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardStockEntryEntity } from './entities/card_stock_entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardStockEntriesService {
  constructor(
    @InjectRepository(CardStockEntryEntity)
    private readonly cardStockEntryRepository: Repository<CardStockEntryEntity>,
  ) {}
  
  async create(data: CreateCardStockEntryDto) {
    const cardStockEntry = this.cardStockEntryRepository.create(data);
    
    return await this.cardStockEntryRepository.save(cardStockEntry);
  }

  async findAll() {
    const cardStockEntries = await this.cardStockEntryRepository.createQueryBuilder('cardStockEntry')
      .leftJoinAndSelect('cardStockEntry.product', 'product')
      .leftJoinAndSelect('cardStockEntry.transaction', 'transaction')
      .select([
        'cardStockEntry.id',
        'cardStockEntry.changeType',
        'cardStockEntry.quantityChange',
        'cardStockEntry.dateCardStock',
        'cardStockEntry.reason',
        'product.name',
        'transaction.id',
      ])
      .orderBy('cardStockEntry.id', 'DESC')

    const data = await cardStockEntries.getMany();
    console.log(data);

    return data;
  }

  async findOne(id: number) {
    const cardStockEntry = await this.cardStockEntryRepository.createQueryBuilder('cardStockEntry')
      .leftJoinAndSelect('cardStockEntry.product', 'product')
      .leftJoinAndSelect('cardStockEntry.transaction', 'transaction')
      .select([
        'cardStockEntry.id',
        'cardStockEntry.changeType',
        'cardStockEntry.quantityChange',
        'cardStockEntry.dateCardStock',
        'cardStockEntry.reason',
        'product.name',
        'transaction.id',
      ])
      .where('cardStockEntry.id = :id', { id: id })
      .orderBy('cardStockEntry.id', 'DESC')

    const data = await cardStockEntry.getOne();
    console.log(data);

    return data;
  }

  async update(id: number, data: UpdateCardStockEntryDto) {
    const cardStockEntry = await this.cardStockEntryRepository.findOne({
      where: {
        id: id,
      },
      
    });

    if (!cardStockEntry) {
      throw new NotFoundException('Card stock entry not found');
    }

    Object.assign(cardStockEntry, data);

    const updatedCardStockEntry = await this.cardStockEntryRepository.save(cardStockEntry);

    return updatedCardStockEntry
  }

  async remove(id: number) {
    const cardStockEntry = await this.cardStockEntryRepository.findOne({
      where: {
        id: id
      },
      
    });

    if (!cardStockEntry) {
      throw new NotFoundException('Card stock entry not found');
    } 

    await this.cardStockEntryRepository.remove(cardStockEntry);  

    return cardStockEntry;
  }
}
