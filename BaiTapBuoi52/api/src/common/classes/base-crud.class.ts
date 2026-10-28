import { ObjectLiteral, Repository, EntityTarget } from "typeorm";
import { DeepPartial } from "typeorm";

import { CrudService } from "../interfaces/crud.service.interface";

export class BaseCrudService<
    T extends ObjectLiteral,
    createDto = any,
    UpdateDto = DeepPartial<T>,
> implements CrudService<T, createDto, UpdateDto> {
    constructor(
        protected readonly repo: Repository<T>,
        private readonly entity: EntityTarget<T>,
    ) {}
    async getAll(): Promise<T[]> {
        return await this.repo
            .createQueryBuilder("e")
            .andWhere("e.active = :active", { active: true })
            .getMany();
    }
    async getById(id: string): Promise<T | null> {
        return await this.repo
            .createQueryBuilder("e")
            .where("e.id= :id", { id })
            .andWhere("e.active= :active", { active: true })
            .getOne();
    }
    async create(dto: createDto): Promise<T> {
        const result = await this.repo
            .createQueryBuilder()
            .insert()
            .into(this.entity)
            .values(dto as any)
            .returning("*")
            .execute();
        return result.raw[0] as T;
    }
    async update(id: string, dto: UpdateDto): Promise<T | null> {
        const result = await this.repo
            .createQueryBuilder("e")
            .update(this.entity)
            .set(dto as any)
            .where("id = :id", { id })
            .andWhere("active = :active", { active: true })
            .returning("*")
            .execute();
        return (result.raw[0] as T) ?? null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repo
            .createQueryBuilder("e")
            .update(this.entity)
            .set({ active: false } as any)
            .where("id = :id", { id })
            .andWhere("active = :active", { active: true })
            .execute();

        // affected = số dòng bị UPDATE ảnh hưởng
        // 0 = không dòng nào khớp WHERE (id sai hoặc đã xóa rồi)
        // >0 = đã soft delete thành công
        // "?? 0" phòng trường hợp driver không trả affected (null/undefined)
        return (result.affected ?? 0) > 0;
    }
}
// tôi sẽ tự viết tay cho quen chứ quen viết service dùng property cho lắm , viết để làm chủ
