import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CategoryService } from './service';
import {
  CreateCategoryDto,
  CategoryDto,
  UpdateCategoryDto,
} from './dto/categoryDto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // GET /categories
  @Get()
  @ApiOkResponse({
    description: 'Get list category successfully',
    type: [CategoryDto],
  })
  async findAll() {
    return await this.categoryService.getAll();
  }

  // GET /categories/:id
  @Get(':id')
  @ApiOkResponse({
    description: 'Get category thành công',
    type: CategoryDto,
  })
  @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
  @ApiNotFoundResponse({ description: 'Not found resource' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const category = await this.categoryService.getById(id);
    if (!category) {
      throw new NotFoundException(`Không tìm thấy category với id ${id}`);
    }
    return category;
  }

  // POST /categories
  @Post()
  @ApiCreatedResponse({
    description: 'Create category success',
    type: CategoryDto,
  })
  @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
  @ApiConflictResponse({ description: 'Category name đã tồn tại' })
  async create(@Body() body: CreateCategoryDto) {
    return await this.categoryService.create(body);
  }

  // PATCH /categories/:id
  @Patch(':id')
  @ApiOkResponse({
    description: 'Patch category success',
    type: CategoryDto,
  })
  @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
  @ApiConflictResponse({ description: 'Category name đã tồn tại' })
  @ApiNotFoundResponse({ description: 'Not found resource' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: UpdateCategoryDto,
  ) {
    const updated = await this.categoryService.update(id, updateData);
    if (!updated) {
      throw new NotFoundException(`Không tìm thấy category với id ${id}`);
    }
    return updated;
  }

  // DELETE /categories/:id (soft delete)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Delete cateogry success',
    schema: {
      example: { message: 'Xóa cateogry thành công' },
    },
  })
  @ApiBadRequestResponse({ description: 'Id không hợp lệ' })
  @ApiNotFoundResponse({ description: 'Not found resource' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = await this.categoryService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Không tìm thấy category với id ${id}`);
    }
  }
}
