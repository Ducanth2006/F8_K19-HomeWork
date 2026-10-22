import { Injectable } from '@nestjs/common';
import { CreateJobApllicationDto } from './dto/create-job_apllication.dto';
import { UpdateJobApllicationDto } from './dto/update-job_apllication.dto';

@Injectable()
export class JobApllicationService {
  create(createJobApllicationDto: CreateJobApllicationDto) {
    return 'This action adds a new jobApllication';
  }

  findAll() {
    return `This action returns all jobApllication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobApllication`;
  }

  update(id: number, updateJobApllicationDto: UpdateJobApllicationDto) {
    return `This action updates a #${id} jobApllication`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobApllication`;
  }
}
