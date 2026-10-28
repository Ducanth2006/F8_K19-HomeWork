import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './entities/company.entity';
import { CompanyAddress } from '@/company_address/entities/company_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyAddress])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule { }
