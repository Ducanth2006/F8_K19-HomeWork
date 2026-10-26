import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProvinceService } from './province.service';
import { Province } from './entities/province.entity';

@ApiTags('provinces')
@Controller('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả tỉnh/thành phố' })
  @ApiResponse({ status: 200, type: [Province] })
  async findAll(): Promise<Province[]> {
    return await this.provinceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin tỉnh/thành phố theo ID' })
  @ApiResponse({ status: 200, type: Province })
  @ApiResponse({ status: 404, description: 'Province not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Province> {
    return await this.provinceService.findOne(id);
  }
}