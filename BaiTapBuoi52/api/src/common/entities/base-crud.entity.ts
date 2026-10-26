import {
  Column,
  PrimaryGeneratedColumn,  
} from 'typeorm';

export abstract class BaseEntity {
   @PrimaryGeneratedColumn('uuid') id: string;
   @Column({ default: true }) active: boolean;
}