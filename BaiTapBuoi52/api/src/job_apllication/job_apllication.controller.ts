import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobApllicationService } from './job_apllication.service';
import { CreateJobApllicationDto } from './dto/create-job_apllication.dto';
import { UpdateJobApllicationDto } from './dto/update-job_apllication.dto';

@Controller('job-apllication')
export class JobApllicationController {
  constructor(private readonly jobApllicationService: JobApllicationService) {}

  @Post()
  create(@Body() createJobApllicationDto: CreateJobApllicationDto) {
    return this.jobApllicationService.create(createJobApllicationDto);
  }

  @Get()
  findAll() {
    return this.jobApllicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobApllicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobApllicationDto: UpdateJobApllicationDto) {
    return this.jobApllicationService.update(+id, updateJobApllicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobApllicationService.remove(+id);
  }
}
