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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { CustomerDtoOut } from './dto/customer.dto';

@ApiTags('Customer')
@ApiBearerAuth('accessToken')
@Controller('customers')
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer data',
    type: CreateCustomerDto
  })

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.create(createCustomerDto);

    return new ResponseFormatter(customer, 'Customer created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer data',
    type: CustomerDtoOut
  })

  @Get()
  async findAll() {
    const customers = await this.customersService.findAll();

    return new ResponseFormatter(customers, 'Customers found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer data',
    type: CustomerDtoOut
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customersService.findOne(+id);

    return new ResponseFormatter(customer, 'Customer found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer data',
    type: UpdateCustomerDto
  })

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.customersService.update(
      +id, 
      updateCustomerDto,
    );

    return new ResponseFormatter(customer, 'Customer updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const customer = await this.customersService.remove(+id);

    return new ResponseFormatter(customer, 'Customer deleted');
  }
}