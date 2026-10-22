import { ObjectLiteral, Repository, EntityTarget } from "typeorm"
import { DeepPartial } from 'typeorm';

import { CrudService } from "../interfaces/crud.service.interface"



export abstract class BaseCrudService<T extends ObjectLiteral, createDto = any, UpdateDto = DeepPartial<T>> implements CrudService<T, createDto, UpdateDto> {
    constructor(private readonly repo: Repository<T>, private readonly entity: EntityTarget<T>) { }
    async getAll(): Promise<T[]> {
        return await this.repo.createQueryBuilder().getMany();
    }
    async getById(id: string): Promise<T | null> {
        return await this.repo.createQueryBuilder("entity").where("entity.id= :id", { id }).getOne()
    }
    async create(dto: createDto): Promise<T> {
        const result = await this.repo.createQueryBuilder().insert().into(this.entity).values(dto as any).returning("*").execute()
        return result.raw[0] as T
    }
    async update(id: string, dto: UpdateDto): Promise<T | null> {
        const aliveID = await this.getById(id);
        if (!aliveID) return null
        const result = await this.repo.createQueryBuilder("e").update(this.entity).set(dto as any).where("e.id= :id", { id }).returning("*").execute();
        return result.raw[0] as T
    }

    async delete(id: string): Promise<boolean> {
        const aliveID = await this.getById(id);
        if (!aliveID) return false
        return true;

    }

} 
// Những lưu í :
// Dùng T truyền vào các hàm thực thi 
