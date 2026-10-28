import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './category/entities/category.entity';

import { CategoryModule } from './category/module';
import { JobModule } from './Job/module';
import { CompanyModule } from './company/company.module';
import { CvModule } from './cv/cv.module';
import { CandidateModule } from './candidate/candidate.module';
import { JobApplicationModule } from './job_application/job_application.module';
import { ProvinceModule } from './province/province.module';
import { WardModule } from './ward/ward.module';
import { Company } from './company/entities/company.entity';
import { Candidate } from './candidate/entities/candidate.entity';
import { Job } from './Job/entities/job.entity';
import { JobApplication } from './job_application/entities/job_application.entity';
import { Cv } from './cv/entities/cv.entity';
import { CompanyAddress } from './company_address/entities/company_address.entity';
import { Province } from './province/entities/province.entity';
import { Ward } from './ward/entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'portalDb',
    entities: [Province, Ward, Category, Company, Candidate, Job, JobApplication, Cv, CompanyAddress],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  }), CategoryModule, JobModule, CompanyModule, CvModule, CandidateModule, JobApplicationModule, ProvinceModule, WardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
