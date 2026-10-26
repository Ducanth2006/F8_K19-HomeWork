import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';import { CompanyAddressService } from './company_address.service';
import { CreateCompanyAddressDto } from './dto/create-company_address.dto';
import { UpdateCompanyAddressDto } from './dto/update-company_address.dto';
import { CompanyAddressDto } from './dto/company_address.dto';

@Controller('company-address')
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}

  // POST /CompanyAddress
     @Post()
     @ApiCreatedResponse({
       description: 'Create CompanyAddress success',
       type: CompanyAddressDto,
     })
     @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
     @ApiConflictResponse({ description: 'CompanyAddress name đã tồn tại' })
     async create(@Body() body: CreateCompanyAddressDto) {
       return await this.companyAddressService.create(body);
     }
   
     @Get()
     @ApiOkResponse({
       description: 'Get list CompanyAddress successfully',
       type: [CompanyAddressDto],
     })
     findAll() {
       return this.companyAddressService.getAll();
     }
   
     // GET /CompanyAddress/:id
     @Get(':id')
     @ApiOkResponse({
       description: 'Get CompanyAddress thành công',
       type: CompanyAddressDto,
     })
     @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
     @ApiNotFoundResponse({ description: 'Not found resource' })
     async findOne(@Param('id', ParseUUIDPipe) id: string) {
       const CompanyAddress = await this.companyAddressService.getById(id);
       if (!CompanyAddress) {
         throw new NotFoundException(`Không tìm thấy CompanyAddress với id ${id}`);
       }
       return CompanyAddress;
     }
   
     // Patch
     @Patch(':id')
     @ApiOkResponse({
       description: 'Patch CompanyAddress success',
       type:CompanyAddressDto
     })
     @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
     @ApiConflictResponse({ description: 'CompanyAddress name đã tồn tại' })
     @ApiNotFoundResponse({ description: 'Not found resource' })
     async update(
       @Param('id', ParseUUIDPipe) id: string,
       @Body() updateData: UpdateCompanyAddressDto,
     ) {
       const updated = await this.companyAddressService.update(id, updateData);
       if (!updated) {
         throw new NotFoundException(`Không tìm thấy CompanyAddress với id ${id}`);
       }
       return updated;
     }
     // DELETE /CompanyAddress/:id (soft delete)
     @Delete(':id')
     @HttpCode(HttpStatus.OK)
     @ApiOkResponse({
     description: 'Delete CompanyAddress success',
     schema: {
       example: { message: 'Xóa CompanyAddress thành công' },
     },
   })
     @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
     @ApiNotFoundResponse({ description: 'Not found resource' })
     async remove(@Param('id', ParseUUIDPipe) id: string) {
       const deleted = await this.companyAddressService.delete(id);
       if (!deleted) {
         throw new NotFoundException(`Không tìm thấy CompanyAddress với id ${id}`);
       }
       return { message: 'Xóa CompanyAddress thành công' , status:200 };
     }
}
