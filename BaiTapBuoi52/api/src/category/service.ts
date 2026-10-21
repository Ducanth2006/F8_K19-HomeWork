import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryDto } from './dto/categoryDto';
export interface Category {
    id: string;
    name: string;
    created_at?: string|null;
    created_by?: string|null;
    modified_at?: string|null;
    modified_by?: string|null;
    deleted_at?: string | null;
    deleted_by?: string | null;
    active: boolean;
}

@Injectable()
export class CategoryService {
    private categories: Category[] = [
        {
            id: '1',
            name: 'IT',
            active: true,
            created_at: '2026-10-15T14:30:00.000Z',
            created_by: 'usr_123456',
            modified_at: '2026-10-15T14:30:00.000Z',
            modified_by: 'usr_123456',
            deleted_at: null,
            deleted_by: null,
        },
    ];
    getList(): Category[] {
        return this.categories;
    }
    getById(id: string): Category | null {
        return this.categories.find((c) => c.id === id) ?? null;
    }
    create(dto: CreateCategoryDto): Category {
        const newCate = {
            id: uuidv4(),
            name: dto.name,
            active: dto.active ?? true,
            created_at: new Date().toISOString(),
            created_by: 'usr_123456', // Sau này có Auth sẽ lấy từ req.user.id
            modified_at: null,
            modified_by: null,
            deleted_at: null,
            deleted_by: null,
        };
        this.categories.push(newCate);
        return newCate;
    }
    patch(id: string, updateData: Partial<Category>): Category | null {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index === -1) return null;
        this.categories[index] = {
            ...this.categories[index],
            ...updateData,
        };
        return this.categories[index];
    }
    delete(id: string): null | object {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index === -1) return null;
        this.categories.splice(index, 1);
        return {message:"Xóa thành công "};
    }
}
