import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorsRepository: Repository<DoctorEntity>,
  ) {}

  async create(data: CreateDoctorDto) {
    const doctor = this.doctorsRepository.create(data);

    return await this.doctorsRepository.save(doctor);
  }

  async findAll() {
    const doctors = await this.doctorsRepository.find({
      order: {
        id: 'DESC',
      }, 
    });

    return doctors;
  }

  async findOne(doctor_id: number) {
    const doctor = await this.doctorsRepository.findOne({
      where: {
        id: doctor_id,
      }, 
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async update(doctor_id: number, data: UpdateDoctorDto) {
    const doctor = await this.doctorsRepository.findOne({
      where: {
        id: doctor_id,
      }, 
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    Object.assign(doctor, data);

    return await this.doctorsRepository.save(doctor);
  }

  async remove(doctor_id: number) {
    const doctor = await this.doctorsRepository.findOne({
      withDeleted: true,
      where: {
        id: doctor_id,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return await this.doctorsRepository.softRemove(doctor);
  }
}
