import { Injectable } from '@nestjs/common';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
import { BaseCrudService } from '@/common/classes/base-crud.class';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class jobServices extends BaseCrudService<Job,CreateJobDto,UpdateJobDto> {
  constructor(@InjectRepository(Job) repo:Repository<Job>){
    super(repo,Job);
  }
}
