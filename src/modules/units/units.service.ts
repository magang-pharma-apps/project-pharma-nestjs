import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitEntity } from './entities/unit.entity';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}
  
  async create(data: CreateUnitDto) {
    const unit = this.unitRepository.create(data);

    return await this.unitRepository.save(unit);
  }

  async findAll() {
    const units = await this.unitRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return units;
  }

  async findOne(units_id: number) {
    const unit = await this.unitRepository.findOne({
      where: {
        id: units_id,
      },
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return unit;
  }

  async update(units_id: number, data: UpdateUnitDto) {
    const unit = await this.unitRepository.findOne({
      where: {
        id: units_id,
      }
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    Object.assign(unit, data);

    return await this.unitRepository.save(unit);
  }

  async remove(units_id: number) {
    const unit = await this.unitRepository.findOne({
      withDeleted: true,
      where: {
        id: units_id,
      }
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return await this.unitRepository.softRemove(unit);
  }
}
