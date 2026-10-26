import { Injectable } from '@nestjs/common';
import { CreateCompanyAddressDto } from './dto/create-company_address.dto';
import { UpdateCompanyAddressDto } from './dto/update-company_address.dto';
import { BaseCrudService } from '@/common/classes/base-crud.class';
import { CompanyAddress } from './entities/company_address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyAddressService extends BaseCrudService<CompanyAddress,CreateCompanyAddressDto,UpdateCompanyAddressDto>{
  constructor(@InjectRepository(CompanyAddress) repo:Repository<CompanyAddress>){
    super(repo,CompanyAddress)

  }
 
}
