import { IntersectionType } from "@nestjs/swagger";
import { AuditMetadataDto } from "@/shared/dto/AuditMetadata.dto";
import { UpdateCompanyAddressDto } from "./update-company_address.dto";
import { Expose } from "class-transformer";

export class ResponseCompanyAddressDto {
    @Expose() id: string;
    @Expose() provinceId: number;
    @Expose() wardId: number;
    @Expose() addressDetail: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    createdBy: string;
    updatedBy?: string;
    deletedBy?: string;
    active?: boolean;
}
