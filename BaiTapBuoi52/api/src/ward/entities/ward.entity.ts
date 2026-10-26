import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('ward')
export class Ward {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'province_id', type: 'bigint', nullable: false })
  provinceId: number;

  @Column({ type: 'text', nullable: false })
  name: string;
}