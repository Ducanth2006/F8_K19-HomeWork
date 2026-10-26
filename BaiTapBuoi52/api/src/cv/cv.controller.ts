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
} from '@nestjs/swagger';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvDto } from './dto/cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}
  // POST /cv
    @Post()
    @ApiCreatedResponse({
      description: 'Create cv success',
      type:CvDto,
    })
    @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
    @ApiConflictResponse({ description: 'cv name đã tồn tại' })
    async create(@Body() body: CreateCvDto) {
      return await this.cvService.create(body);
    }
  
    @Get()
    @ApiOkResponse({
      description: 'Get list cv successfully',
      type: [CvDto],
    })
    findAll() {
      return this.cvService.getAll();
    }
  
    // GET /cv/:id
    @Get(':id')
    @ApiOkResponse({
      description: 'Get cv thành công',
      type: CvDto,
    })
    @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
    @ApiNotFoundResponse({ description: 'Not found resource' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      const cv = await this.cvService.getById(id);
      if (!cv) {
        throw new NotFoundException(`Không tìm thấy cv với id ${id}`);
      }
      return cv;
    }
  
    // Patch
    @Patch(':id')
    @ApiOkResponse({
      description: 'Patch cv success',
      type: CvDto,
    })
    @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
    @ApiConflictResponse({ description: 'cv name đã tồn tại' })
    @ApiNotFoundResponse({ description: 'Not found resource' })
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateData: UpdateCvDto,
    ) {
      const updated = await this.cvService.update(id, updateData);
      if (!updated) {
        throw new NotFoundException(`Không tìm thấy cv với id ${id}`);
      }
      return updated;
    }
    // DELETE /cv/:id (soft delete)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
    description: 'Delete cv success',
    schema: {
      example: { message: 'Xóa cv thành công' },
    },
  })
    @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
    @ApiNotFoundResponse({ description: 'Not found resource' })
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      const deleted = await this.cvService.delete(id);
      if (!deleted) {
        throw new NotFoundException(`Không tìm thấy cv với id ${id}`);
      }
      return { message: 'Xóa cv thành công' , status:200 };
    }

 
}
