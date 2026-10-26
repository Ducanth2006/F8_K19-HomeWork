import { IntersectionType } from "@nestjs/swagger";
import { AuditMetadataDto } from "@/shared/dto/AuditMetadata.dto";
import { UpdateCandidateDto } from "./update-candidate.dto";
import { CreateCandidateDto } from "./create-candidate.dto";

export class CandidateDto extends IntersectionType(CreateCandidateDto,AuditMetadataDto){}
