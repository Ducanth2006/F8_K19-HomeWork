import { PartialType } from '@nestjs/swagger';
import { CreateJobApllicationDto } from './create-job_apllication.dto';

export class UpdateJobApllicationDto extends PartialType(CreateJobApllicationDto) {}
