import { Column, CreateDateColumn, DeleteDateColumn,UpdateDateColumn } from "typeorm";


export class AuditMetaDataEntity{
      @CreateDateColumn({
        type: "timestamptz",
        default: () => "now()"
    })
    createdAt: Date;
    @Column({
        type: "uuid", nullable: true
    })
    createdBy?: string
    @UpdateDateColumn({ type: "timestamptz", nullable: true })
    modifiedAt?: Date;
    @Column({ type: "uuid", nullable: true })
    modifiedBy?: string
    @DeleteDateColumn({
        type: "timestamptz", nullable: true

    }) deletedAt?: Date;
    @Column({
        type: "uuid", nullable: true
    })
    deletedBy?: string
    @Column({ type: "boolean", default: true })
    active: boolean
}