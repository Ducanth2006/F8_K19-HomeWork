import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { BaseCrudService } from '@/common/classes/base-crud.class';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CvService extends BaseCrudService<Cv,CreateCvDto,UpdateCvDto> {
  constructor(@InjectRepository(Cv) repo:Repository<Cv>){
    super(repo,Cv)
  }
}
