import { AuditMetaDataEntity } from '@/common/entities/auditMetaData.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('job_application')
export class JobApplication extends AuditMetaDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'job_id', type: 'uuid' })
  jobId: string;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidateId: string;

  @Column({ name: 'cv_id', type: 'uuid' })
  cvId: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  status: string;
}