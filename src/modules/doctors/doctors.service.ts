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

  async findOne(doctors_id: number) {
    const doctor = await this.doctorsRepository.createQueryBuilder('doctor')
      .select([
        'doctor.id',
        'doctor.name',
        'doctor.specialization',
        'doctor.phoneNumber',
        'doctor.email'
    ])
      .where('doctor.id = :id', { id: doctors_id })
      .andWhere('doctor.deletedAt IS NULL')
      .orderBy('doctor.id', 'DESC')

    const data = await doctor.getOne();
    console.log(data);

    return data;
  }

  async update(doctors_id: number, data: UpdateDoctorDto) {
    const doctor = await this.doctorsRepository.findOne({
      withDeleted: true,
      where: {
        id: doctors_id,
      }, 
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    Object.assign(doctor, data);

    return await this.doctorsRepository.save(doctor);
  }

  async remove(doctors_id: number) {
    const doctor = await this.doctorsRepository.findOne({
      where: {
        id: doctors_id,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return await this.doctorsRepository.softRemove(doctor);
  }
}
