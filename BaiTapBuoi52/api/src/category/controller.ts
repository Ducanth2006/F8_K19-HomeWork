import { Controller, Delete, Get, Patch, Post, Body, Param, NotFoundException } from "@nestjs/common";
import { CategoryService, type Category } from "./service";
import { ApiBadRequestResponse, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiConflictResponse } from "@nestjs/swagger";
import { CreateCategoryDto, CategoryDto,UpdateCategoryDto } from "./dto/categoryDto";
@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    // get
    @Get()
    @ApiOkResponse({
        description: "Get list category successfully",
        type: [CategoryDto]

    })

    getCategory() {
        return this.categoryService.getList();
    }
    // Get by id

    @Get(":id")
    @ApiOkResponse({
        description: "Get  category thành công",
        type: CategoryDto

    })
    @ApiNotFoundResponse({ description: "Not found resource" })
    getCategoryById(@Param("id") id: string) {
        const cate = this.categoryService.getById(id);
        if (!cate) {
            throw new NotFoundException(`Không thể tìm thấy category với ${id}`)
        }
        return cate;
    }
    // Post

    @Post()
    @ApiCreatedResponse({
        description: "Create category success",
        type: CategoryDto
    })
    @ApiBadRequestResponse({ description: "Dữ liệu gửi lên không hợp lệ" })
    @ApiConflictResponse({ description: "Category name đã tồn tại" })
    createCategory(@Body() body: CreateCategoryDto) {
        return this.categoryService.create(body);
    }

    @Patch(":id")
    @ApiOkResponse({
        description: "Patch category success",
        type: CategoryDto
    })
    @ApiBadRequestResponse({ description: "Dữ liệu gửi lên không hợp lệ" })
    @ApiConflictResponse({ description: "Category name đã tồn tại" })
    @ApiNotFoundResponse({ description: "Not found resource" })
    patchCategory(@Param("id") id: string, @Body() updateData: UpdateCategoryDto) {
        return this.categoryService.patch(id, updateData);
    }
    @Delete(":id")
    @ApiOkResponse({
        description:"Delete category success"
    })
    @ApiNotFoundResponse({
        description:"Not found resource"
    })
    deleteCategory(@Param("id") id: string) {
        return this.categoryService.delete(id);
    }


}