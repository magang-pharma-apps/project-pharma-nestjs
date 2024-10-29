import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  HttpStatus
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { DoctorDtoOut } from './dto/doctor.dto';

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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const doctor = await this.doctorsService.findOne(+id);

    return new ResponseFormatter(doctor, 'Doctor found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Doctor data',
    type: UpdateDoctorDto
  })

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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const doctor = await this.doctorsService.remove(+id);

    return new ResponseFormatter(doctor, 'Doctor deleted');
  }
}
