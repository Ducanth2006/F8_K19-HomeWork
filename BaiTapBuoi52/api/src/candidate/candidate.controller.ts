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


import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateDto } from './dto/canditdate.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

   // POST /company
    @Post()
    @ApiCreatedResponse({
      description: 'Create candidate success',
      type: CandidateDto,
    })
    @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
    @ApiConflictResponse({ description: 'candidate name đã tồn tại' })
    async create(@Body() body: CreateCandidateDto) {
      return await this.candidateService.create(body);
    }
  
    @Get()
    @ApiOkResponse({
      description: 'Get list candidate successfully',
      type: [CandidateDto],
    })
    findAll() {
      return this.candidateService.getAll();
    }
  
    // GET /candidate/:id
    @Get(':id')
    @ApiOkResponse({
      description: 'Get candidate thành công',
      type: CandidateDto,
    })
    @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
    @ApiNotFoundResponse({ description: 'Not found resource' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      const candidate = await this.candidateService.getById(id);
      if (!candidate) {
        throw new NotFoundException(`Không tìm thấy candidate với id ${id}`);
      }
      return candidate;
    }
  
    // Patch
    @Patch(':id')
    @ApiOkResponse({
      description: 'Patch candidate success',
      type: CandidateDto,
    })
    @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
    @ApiConflictResponse({ description: 'candidate name đã tồn tại' })
    @ApiNotFoundResponse({ description: 'Not found resource' })
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateData: UpdateCandidateDto,
    ) {
      const updated = await this.candidateService.update(id, updateData);
      if (!updated) {
        throw new NotFoundException(`Không tìm thấy candidate với id ${id}`);
      }
      return updated;
    }
    // DELETE /candidate/:id (soft delete)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
    description: 'Delete candidate success',
    schema: {
      example: { message: 'Xóa candidate thành công' },
    },
  })
    @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
    @ApiNotFoundResponse({ description: 'Not found resource' })
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      const deleted = await this.candidateService.delete(id);
      if (!deleted) {
        throw new NotFoundException(`Không tìm thấy candidate với id ${id}`);
      }
      return { message: 'Xóa candidate thành công' , status:200 };
    }

 
}
