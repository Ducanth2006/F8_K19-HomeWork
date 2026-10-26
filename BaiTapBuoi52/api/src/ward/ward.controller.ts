import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WardService } from './ward.service';
import { Ward } from './entities/ward.entity';

@ApiTags('wards')
@Controller('wards')
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả phường/xã' })
  @ApiResponse({ status: 200, type: [Ward] })
  async findAll(): Promise<Ward[]> {
    return await this.wardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin phường/xã theo ID' })
  @ApiResponse({ status: 200, type: Ward })
  @ApiResponse({ status: 404, description: 'Ward not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Ward> {
    return await this.wardService.findOne(id);
  }
}