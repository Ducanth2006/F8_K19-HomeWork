import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity({ name: "category" })
export class Category {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: string;
    @Column({ type: "text" })
    name: string;
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

