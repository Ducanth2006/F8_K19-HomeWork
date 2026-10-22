import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './category/entities/category.entity';

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
    database: 'portalDb',
    entities: [Category],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  }), CategoryModule, TodoModule, JobModule, CompanyModule, CvModule, CandidateModule, JobApllicationModule, CompanyAddressModule, ProvinceModule, WardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
