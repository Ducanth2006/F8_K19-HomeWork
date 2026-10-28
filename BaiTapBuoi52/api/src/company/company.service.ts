import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { BaseCrudService } from "@/common/classes/base-crud.class";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { CompanyAddress } from "@/company_address/entities/company_address.entity";
import { plainToInstance } from "class-transformer";
import { ResponseCompanyDto } from "./dto/response-company.dto";

@Injectable()
export class CompanyService extends BaseCrudService<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(
    @InjectRepository(Company) repo: Repository<Company>,
    @InjectRepository(CompanyAddress)
    private readonly addressRepo: Repository<CompanyAddress>,
    private readonly dataSource: DataSource,
  ) {
    super(repo, Company);
  }

  async getAllCompanyWithAddress() {
    const companies = await this.repo
      .createQueryBuilder("company")
      .leftJoinAndMapMany(
        "company.addresses",
        CompanyAddress,
        "ca",
        "ca.company_id= company.id and ca.active = :active",
        { active: true },
      )
      .where("company.active = :active", { active: true })
      .getMany();
    // Giải thích dòng này phần này tôi chưa hiểu này
    return plainToInstance(ResponseCompanyDto, companies, {
      excludeExtraneousValues: true,
    });
  }

  async createWithAddress(dto: CreateCompanyDto) {
    //good solution
    const { addresses, ...companyData } = dto;
    const result = await this.dataSource.transaction(async (manager) => {
      const companyInsertResult = await manager
        .createQueryBuilder()
        .insert()
        .into(Company)
        .values(companyData as any)
        .returning("*")
        .execute();
      const createdCompany = companyInsertResult.raw[0] as Company;
      let addresses: CompanyAddress[] = [];
      if (addresses && addresses.length > 0) {
        // good solution map là trả về một mảng mới với giá trị được thêm vào là companyId
        const addressValues = addresses.map((addr) => ({
          ...addr,
          companyId: createdCompany.id,
        }));
        const addressResult = await manager
          .createQueryBuilder()
          .insert()
          .into(CompanyAddress)
          .values(addressValues as any)
          .returning("*")
          .execute();
        addresses = addressResult.raw;
      }
      // good solution
      return { ...createdCompany, addresses };
    });
    return plainToInstance(ResponseCompanyDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
