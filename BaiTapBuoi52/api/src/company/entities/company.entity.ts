import {
  Column,
  Entity,
  PrimaryGeneratedColumn,  
} from 'typeorm';


import { AuditMetaDataEntity } from '@/common/entities/auditMetaData.entity';

@Entity({ name: 'company' })
export class Company extends AuditMetaDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text' })
  tax: string;
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'text' })
  nameEng: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'text' })
  email: string;
  @Column({ type: 'text' })
  phone: string;
  @Column({ type: 'text', nullable: true })
  website?: string;
  @Column({ type: 'int', nullable: true })
  rate?: number;
  @Column({ type: 'text', nullable: true })
  logoUrl?: string;
}
