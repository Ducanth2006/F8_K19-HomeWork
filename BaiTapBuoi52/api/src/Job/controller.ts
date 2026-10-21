import { Body, Controller, Get, Param, Post,Patch,Delete } from '@nestjs/common';
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
  @Get()
  @ApiOkResponse({
    description: 'Get job list successfully',
    type: [JobResponseDto],
  })
  getJobs() {
    return  this.jobService.getList();
  }
  @Get(':id')
  @ApiOkResponse({
    description: 'Get a job successfully',
    type: JobResponseDto,
  })
  @ApiNotFoundResponse({ description: "Can't find that job by that id" })
  getJobById(@Param('id') id: string) {
    return  this.jobService.getById(id);
  }
  @Post()
  @ApiCreatedResponse({
    description: 'Create the Job successfully',
    type: JobResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data please check your validation data',
  })
  @ApiConflictResponse({ description: 'Job name đã tồn tại' })
  createJob(@Body() body: CreateJobDto) {
    return this.jobService.create(body);
  }
  @Patch(":id")
  patchJob(@Param("id")id:string,@Body() body:UpdateJobDto){
    return this.jobService.patch(id,body)
  }
  @Delete(":id")
  deleteJob(@Param("id")id:string){
    return this.jobService.delete(id)
  }
}
