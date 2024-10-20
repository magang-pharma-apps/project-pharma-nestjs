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
  
  async create(createCardStockEntryDto: CreateCardStockEntryDto) {
    const cardStockEntry = this.cardStockEntryRepository.create(createCardStockEntryDto);
    
    return await this.cardStockEntryRepository.save(cardStockEntry);
  }

  async findAll() {
    const cardStockEntries = await this.cardStockEntryRepository.find({
      where: {
        deletedAt: null
      },
      order: {
        id: 'DESC'
      },
      relations: ['product'],
      select: {
        id: true,
        product: {
          name: true
        },
      }
    })

    if (!cardStockEntries) {
      throw new NotFoundException('Card stock entries not found');
    }
    return cardStockEntries
  }

  async findOne(id: number) {
    const cardStockEntry = await this.cardStockEntryRepository.findOne({
      where: {
        id: id,
        deletedAt: null
      },
      order: {
        id: 'DESC'
      },
      relations: ['product'],
      select: {
        id: true,
        product: {
          name: true
        },
      }
    });

    if (!cardStockEntry) {
      throw new NotFoundException('Card stock entry not found');
    }

    return cardStockEntry
  }

  async update(id: number, data: UpdateCardStockEntryDto) {
    const cardStockEntry = await this.cardStockEntryRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
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
      withDeleted: true,
      where: {
        id: id
      },
      
    });

    if (!cardStockEntry) {
      throw new NotFoundException('Card stock entry not found');
    } 

    return await this.cardStockEntryRepository.softRemove(cardStockEntry);  

    return cardStockEntry;
  }
}