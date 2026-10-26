import { Body, Controller, Get, Param, Post,Patch,Delete,ParseUUIDPipe,NotFoundException , HttpCode,
  HttpStatus,} from '@nestjs/common';
import { jobServices } from './services';
import { CreateJobDto, JobResponseDto, UpdateJobDto } from './dto/job.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: jobServices) {}
  // POST /company
      @Post()
      @ApiCreatedResponse({
        description: 'Create job success',
        type: JobResponseDto,
      })
      @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
      @ApiConflictResponse({ description: 'job name đã tồn tại' })
      async create(@Body() body: CreateJobDto) {
        return await this.jobService.create(body);
      }
    
      @Get()
      @ApiOkResponse({
        description: 'Get list job successfully',
        type: [JobResponseDto],
      })
      findAll() {
        return this.jobService.getAll();
      }
    
      // GET /job/:id
      @Get(':id')
      @ApiOkResponse({
        description: 'Get job thành công',
        type: JobResponseDto,
      })
      @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
      @ApiNotFoundResponse({ description: 'Not found resource' })
      async findOne(@Param('id', ParseUUIDPipe) id: string) {
        const job = await this.jobService.getById(id);
        if (!job) {
          throw new NotFoundException(`Không tìm thấy job với id ${id}`);
        }
        return job;
      }
    
      // Patch
      @Patch(':id')
      @ApiOkResponse({
        description: 'Patch job success',
        type: JobResponseDto,
      })
      @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
      @ApiConflictResponse({ description: 'job name đã tồn tại' })
      @ApiNotFoundResponse({ description: 'Not found resource' })
      async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateData: UpdateJobDto,
      ) {
        const updated = await this.jobService.update(id, updateData);
        if (!updated) {
          throw new NotFoundException(`Không tìm thấy job với id ${id}`);
        }
        return updated;
      }
      // DELETE /job/:id (soft delete)
      @Delete(':id')
      @HttpCode(HttpStatus.OK)
      @ApiOkResponse({
      description: 'Delete job success',
      schema: {
        example: { message: 'Xóa job thành công' },
      },
    })
      @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
      @ApiNotFoundResponse({ description: 'Not found resource' })
      async remove(@Param('id', ParseUUIDPipe) id: string) {
        const deleted = await this.jobService.delete(id);
        if (!deleted) {
          throw new NotFoundException(`Không tìm thấy job với id ${id}`);
        }
        return { message: 'Xóa job thành công' , status:200 };
      }
 
}
