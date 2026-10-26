import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { BaseCrudService } from '@/common/classes/base-crud.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateService extends BaseCrudService<Candidate,CreateCandidateDto,UpdateCandidateDto> {
  constructor(@InjectRepository(Candidate) repo:Repository<Candidate> ){
    super(repo,Candidate)
  }
}
