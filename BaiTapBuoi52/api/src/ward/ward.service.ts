import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ward } from './entities/ward.entity';

@Injectable()
export class WardService {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async findAll(): Promise<Ward[]> {
    return await this.wardRepository
      .createQueryBuilder('ward')
      .getMany();
  }

  async findOne(id: number): Promise<Ward> {
    const ward = await this.wardRepository
      .createQueryBuilder('ward')
      .where('ward.id = :id', { id })
      .getOne();

    if (!ward) {
      throw new NotFoundException(`Ward with ID ${id} not found`);
    }

    return ward;
  }
}