import { IntersectionType } from "@nestjs/swagger";
import { AuditMetadataDto } from "@/shared/dto/AuditMetadata.dto";
import { UpdateCompanyAddressDto } from "./update-company_address.dto";

export class CompanyAddressDto extends IntersectionType(UpdateCompanyAddressDto,AuditMetadataDto){}