import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  HttpStatus,
  NotFoundException
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { DoctorDtoOut } from './dto/doctor.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';

@ApiTags('Doctor')
@ApiBearerAuth('accessToken')
@Controller('doctors')
@UseGuards(AuthGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Doctor data',
    type: CreateDoctorDto
  })

  // @Permission('creare:doctors')
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorsService.create(createDoctorDto);

    return new ResponseFormatter(doctor, 'Doctor created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Doctor data',
    type: DoctorDtoOut
  })

  // @Permission('read:doctors')
  @Get()
  async findAll() {
    const doctors = await this.doctorsService.findAll();

    return new ResponseFormatter(doctors, 'Doctors found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Doctor data',
    type: DoctorDtoOut
  })

  // @Permission('read:doctors')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const doctor = await this.doctorsService.findOne(+id);

    if (!doctor) {
      return new NotFoundException('Doctor not found');
    }

    return new ResponseFormatter(doctor, 'Doctor found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Doctor data',
    type: UpdateDoctorDto
  })

  // @Permission('update:doctors')
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    const doctor = await this.doctorsService.update(
      +id, 
      updateDoctorDto,
    );

    return new ResponseFormatter(doctor, 'Doctor updated');
  }

  // @Permission('delete:doctors')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const doctor = await this.doctorsService.remove(+id);

    return new ResponseFormatter(doctor, 'Doctor deleted');
  }
}
