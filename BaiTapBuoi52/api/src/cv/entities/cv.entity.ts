import { AuditMetaDataEntity } from '@/common/entities/auditMetaData.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('cv')
export class Cv extends AuditMetaDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'candidate_id', type: 'uuid' })
  candidateId: string;

  @Column({ type: 'text'})
  title: string;

  @Column({ name: 'file_name', type: 'text', nullable: true })
  fileName?: string;

  @Column({ name: 'file_key', type: 'text', nullable: true })
  fileKey?: string;
}