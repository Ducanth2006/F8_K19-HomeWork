import { DeepPartial } from "typeorm";

export interface CrudService<T, createDto = any, UpdateDto = DeepPartial<T>> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(dto: createDto): Promise<T>;
  update(id: string, dto: UpdateDto): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
