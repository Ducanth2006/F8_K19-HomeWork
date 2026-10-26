import { AuditMetaDataEntity } from '@/common/entities/auditMetaData.entity';
import { Column, PrimaryGeneratedColumn,Entity } from 'typeorm';

import { Gender } from '../enums/enum.entity';

@Entity({ name: 'candidate' })
export class Candidate extends AuditMetaDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'text' })
  phone: string;
  @Column({ type: 'text' })
  email: string;
  @Column({ type: 'enum',enum:Gender,default:Gender.OTHER})
  gender?: Gender;
  @Column({ type: 'int',nullable:true })
  provinceId?: number;
  @Column({ type: 'int',nullable:true  })
  wardId?: number;
  @Column({ type: 'text' ,nullable:true })
  addressDetail?: string;
}
