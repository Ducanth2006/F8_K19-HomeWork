import { UpdateCompanyDto} from "./update-company.dto";
import { IntersectionType } from "@nestjs/swagger";
import { AuditMetadataDto } from "@/shared/dto/AuditMetadata.dto";

export class ResponseCompanyDto extends IntersectionType(UpdateCompanyDto,AuditMetadataDto){}