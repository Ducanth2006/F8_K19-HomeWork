import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { ResponseCompanyDto } from "./dto/response-company.dto";
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // POST /company
  @Post()
  @ApiCreatedResponse({
    description: "Create company success",
    type: ResponseCompanyDto,
  })
  @ApiBadRequestResponse({ description: "Dữ liệu gửi lên không hợp lệ" })
  @ApiConflictResponse({ description: "company name đã tồn tại" })
  async create(@Body() body: CreateCompanyDto) {
    return await this.companyService.createWithAddress(body);
  }

  @Get()
  @ApiOkResponse({
    description: "Get list company successfully",
    type: [ResponseCompanyDto],
  })
  findAll() {
    return this.companyService.getAllCompanyWithAddress();
  }

  // GET /company/:id
  @Get(":id")
  @ApiOkResponse({
    description: "Get company thành công",
    type: ResponseCompanyDto,
  })
  @ApiBadRequestResponse({ description: "Id không hợp lệ" })
  @ApiNotFoundResponse({ description: "Not found resource" })
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const company = await this.companyService.getById(id);
    if (!company) {
      throw new NotFoundException(`Không tìm thấy company với id ${id}`);
    }
    return company;
  }

  // Patch
  @Patch(":id")
  @ApiOkResponse({
    description: "Patch company success",
    type: ResponseCompanyDto,
  })
  @ApiBadRequestResponse({ description: "Dữ liệu gửi lên không hợp lệ" })
  @ApiConflictResponse({ description: "company name đã tồn tại" })
  @ApiNotFoundResponse({ description: "Not found resource" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateData: UpdateCompanyDto,
  ) {
    const updated = await this.companyService.update(id, updateData);
    if (!updated) {
      throw new NotFoundException(`Không tìm thấy company với id ${id}`);
    }
    return updated;
  }
  // DELETE /company/:id (soft delete)
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: "Delete company success",
    schema: {
      example: { message: "Xóa company thành công" },
    },
  })
  @ApiBadRequestResponse({ description: "Id không hợp lệ" })
  @ApiNotFoundResponse({ description: "Not found resource" })
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    const deleted = await this.companyService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Không tìm thấy company với id ${id}`);
    }
    return { message: "Xóa company thành công", status: 200 };
  }
}
