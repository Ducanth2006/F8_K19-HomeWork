import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeleteDateColumn } from 'typeorm';

@Entity({ name: 'company' })
export class Company {
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
  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;
  @Column({ type: 'uuid', nullable: true })
  createdBy?: string;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  modifiedAt?: Date;
  @Column({ type: 'uuid', nullable: true })
  modifiedBy?: string;
  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;
  @Column({ type: 'uuid', nullable: true })
  deletedBy?: string;
  @Column({ type: 'boolean', default: true })
  active: boolean;
}
