import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import {BaseCrudService} from "@/common/classes/base-crud.class"
import { Category } from "@/category/entities/category.entity"
import {CategoryDto, CreateCategoryDto,UpdateCategoryDto } from './dto/categoryDto';


@Injectable()
export class CategoryService extends BaseCrudService<Category,CreateCategoryDto,UpdateCategoryDto> {
    constructor(@InjectRepository(Category)repo:Repository<Category>){
        super(repo,Category)
    }
   
}
