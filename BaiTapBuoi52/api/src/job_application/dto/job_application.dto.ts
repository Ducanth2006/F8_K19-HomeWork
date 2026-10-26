
import { IntersectionType } from "@nestjs/swagger";
import { AuditMetadataDto } from "@/shared/dto/AuditMetadata.dto";
import { UpdateJobApplicationDto } from "./update-job_application.dto";

export class JobApplicationDto extends IntersectionType(UpdateJobApplicationDto,AuditMetadataDto){}