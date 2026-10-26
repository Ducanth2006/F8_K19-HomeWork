
import { IntersectionType } from "@nestjs/swagger";
import { AuditMetadataDto } from "@/shared/dto/AuditMetadata.dto";
import { UpdateCvDto } from "./update-cv.dto";

export class CvDto extends IntersectionType(UpdateCvDto,AuditMetadataDto){}