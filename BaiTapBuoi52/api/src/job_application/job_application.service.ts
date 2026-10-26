import { Injectable } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job_application.dto';
import { UpdateJobApplicationDto } from './dto/update-job_application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from './entities/job_application.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@/common/classes/base-crud.class';

@Injectable()
export class JobApplicationService extends BaseCrudService<JobApplication,CreateJobApplicationDto,UpdateJobApplicationDto> {
  constructor(@InjectRepository(JobApplication) repo:Repository<JobApplication>){
    super(repo,JobApplication)
  }
}
