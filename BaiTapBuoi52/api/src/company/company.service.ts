import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { BaseCrudService } from '@/common/classes/base-crud.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService extends BaseCrudService<Company,CreateCompanyDto,UpdateCompanyDto>{
  constructor( @InjectRepository(Company) repo:Repository<Company>){
    super(repo,Company)
  }
}
