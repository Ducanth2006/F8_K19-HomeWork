import { UpdateCompanyDto } from "./update-company.dto";
import { IntersectionType } from "@nestjs/swagger";
import { AuditMetadataDto } from "@/shared/dto/AuditMetadata.dto";
import { Expose, Type } from "class-transformer";
import { ResponseCompanyAddressDto } from "@/company_address/dto/company_address.dto";

export class ResponseCompanyDto {
    @Expose()
    id: string;
    @Expose()
    tax: string;
    @Expose()
    name: string;
    @Expose()
    nameEng: string;
    @Expose()
    description: string;
    @Expose()
    @Type(() => ResponseCompanyAddressDto)
    addresses: ResponseCompanyAddressDto[];
    @Expose()
    email: string;
    @Expose()
    phone: string;
    @Expose()
    website?: string;
    @Expose()
    rate?: number;
    @Expose()
    logoUrl?: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    createdBy: string;
    updatedBy?: string;
    deletedBy?: string;
    active?: boolean;
}
