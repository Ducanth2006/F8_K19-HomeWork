import { AuditMetaDataEntity } from '@/common/entities/auditMetaData.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('company_address')
export class CompanyAddress extends AuditMetaDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'company_id', type: 'uuid', nullable: false })
  companyId: string;

  @Column({ name: 'province_id', type: 'bigint', nullable: false })
  provinceId: number;

  @Column({ name: 'ward_id', type: 'bigint', nullable: false })
  wardId: number;

  @Column({ name: 'address_detail', type: 'text', nullable: true })
  addressDetail: string;
}