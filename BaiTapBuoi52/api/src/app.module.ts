import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from './category/module';
import { TodoModule } from './todos/module';
import { JobModule } from './Job/module';
import { CompanyModule } from './company/company.module';
import { CvModule } from './cv/cv.module';
import { CandidateModule } from './candidate/candidate.module';
import { JobApllicationModule } from './job_apllication/job_apllication.module';
import { CompanyAddressModule } from './company_address/company_address.module';
import { ProvinceModule } from './province/province.module';
import { WardModule } from './ward/ward.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'default',
    entities: [],
    synchronize: false,
  }), CategoryModule, TodoModule, JobModule, CompanyModule, CvModule, CandidateModule, JobApllicationModule, CompanyAddressModule, ProvinceModule, WardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
