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
import { JobApplicationService } from './job_application.service';
import { CreateJobApplicationDto } from './dto/create-job_application.dto';
import { UpdateJobApplicationDto } from './dto/update-job_application.dto';
import { JobApplicationDto } from './dto/job_application.dto';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

 // POST /JobApplication
   @Post()
   @ApiCreatedResponse({
     description: 'Create JobApplication success',
     type: JobApplicationDto,
   })
   @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
   @ApiConflictResponse({ description: 'JobApplication name đã tồn tại' })
   async create(@Body() body: CreateJobApplicationDto) {
     return await this.jobApplicationService.create(body);
   }
 
   @Get()
   @ApiOkResponse({
     description: 'Get list JobApplication successfully',
     type: [JobApplicationDto],
   })
   findAll() {
     return this.jobApplicationService.getAll();
   }
 
   // GET /JobApplication/:id
   @Get(':id')
   @ApiOkResponse({
     description: 'Get JobApplication thành công',
     type: JobApplicationDto,
   })
   @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
   @ApiNotFoundResponse({ description: 'Not found resource' })
   async findOne(@Param('id', ParseUUIDPipe) id: string) {
     const JobApplication = await this.jobApplicationService.getById(id);
     if (!JobApplication) {
       throw new NotFoundException(`Không tìm thấy JobApplication với id ${id}`);
     }
     return JobApplication;
   }
 
   // Patch
   @Patch(':id')
   @ApiOkResponse({
     description: 'Patch JobApplication success',
     type:JobApplicationDto
   })
   @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
   @ApiConflictResponse({ description: 'JobApplication name đã tồn tại' })
   @ApiNotFoundResponse({ description: 'Not found resource' })
   async update(
     @Param('id', ParseUUIDPipe) id: string,
     @Body() updateData: UpdateJobApplicationDto,
   ) {
     const updated = await this.jobApplicationService.update(id, updateData);
     if (!updated) {
       throw new NotFoundException(`Không tìm thấy JobApplication với id ${id}`);
     }
     return updated;
   }
   // DELETE /JobApplication/:id (soft delete)
   @Delete(':id')
   @HttpCode(HttpStatus.OK)
   @ApiOkResponse({
   description: 'Delete JobApplication success',
   schema: {
     example: { message: 'Xóa JobApplication thành công' },
   },
 })
   @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
   @ApiNotFoundResponse({ description: 'Not found resource' })
   async remove(@Param('id', ParseUUIDPipe) id: string) {
     const deleted = await this.jobApplicationService.delete(id);
     if (!deleted) {
       throw new NotFoundException(`Không tìm thấy JobApplication với id ${id}`);
     }
     return { message: 'Xóa JobApplication thành công' , status:200 };
   }
}
