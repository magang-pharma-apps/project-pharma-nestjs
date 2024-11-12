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
    const doctors = await this.doctorsRepository.createQueryBuilder('doctor')
      .select([
        'doctor.id',
        'doctor.name',
        'doctor.specialization',
        'doctor.phoneNumber',
        'doctor.email'
      ])
      .where('doctor.deletedAt IS NULL')
      .orderBy('doctor.id', 'DESC')

    const data = await doctors.getMany();
    console.log(data);

    return data;
  }

  async findOne(doctor_id: number) {
    const doctor = await this.doctorsRepository.createQueryBuilder('doctor')
      .select([
        'doctor.id',
        'doctor.name',
        'doctor.specialization',
        'doctor.phoneNumber',
        'doctor.email'
    ])
      .where('doctor.deletedAt IS NULL')
      .andWhere('doctor.id = :id', { id: doctor_id })
      .orderBy('doctor.id', 'DESC')

    const data = await doctor.getOne();
    console.log(data);

    return data;
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
