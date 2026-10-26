import { Column,  Entity, PrimaryGeneratedColumn } from "typeorm";

import { AuditMetaDataEntity } from "@/common/entities/auditMetaData.entity";

@Entity({ name: "category" })
export class Category extends AuditMetaDataEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: string;
    @Column({ type: "text" })
    name: string;
    @Column({type:"bigint",nullable:true})
    parentId:string;
}

