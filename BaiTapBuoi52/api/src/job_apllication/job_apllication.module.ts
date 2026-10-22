import { Module } from '@nestjs/common';
import { JobApllicationService } from './job_apllication.service';
import { JobApllicationController } from './job_apllication.controller';

@Module({
  controllers: [JobApllicationController],
  providers: [JobApllicationService],
})
export class JobApllicationModule {}
