import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './entities/province.entity';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  async findAll(): Promise<Province[]> {
    return await this.provinceRepository
      .createQueryBuilder('province')
      .getMany();
  }

  async findOne(id: number): Promise<Province> {
    const province = await this.provinceRepository
      .createQueryBuilder('province')
      .where('province.id = :id', { id })
      .getOne();

    if (!province) {
      throw new NotFoundException(`Province with ID ${id} not found`);
    }

    return province;
  }
}