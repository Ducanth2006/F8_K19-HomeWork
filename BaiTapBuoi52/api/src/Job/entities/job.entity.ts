import { Entity,PrimaryGeneratedColumn,
  Column, } from "typeorm";
import { WorkType } from "../enums/work-type.enum";
import { AuditMetaDataEntity } from "@/common/entities/auditMetaData.entity";
@Entity("job")
export class Job extends AuditMetaDataEntity{
 @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  requirement: string;

  @Column({ type: 'text', nullable: true })
  benefit: string;

  @Column({ type: 'int', nullable: true })
  experience: number;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'min_salary', type: 'int', nullable: true })
  minSalary: number;

  @Column({ name: 'max_salary', type: 'int', nullable: true })
  maxSalary: number;

  @Column({ type: 'text', nullable: true })
  qualification: string;

  @Column({
    name: 'work_type',
    type: 'enum',
    enum: WorkType,
    default: WorkType.FULL_TIME,
  })
  workType: WorkType;

  @Column({ name: 'working_time', type: 'text', nullable: true })
  workingTime: string;

}