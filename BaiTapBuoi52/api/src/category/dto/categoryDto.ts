import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from '@nestjs/swagger';
import { AuditMetadataDto } from '@/shared/dto/AuditMetadata.dto';
import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumberString } from 'class-validator';


export class CreateCategoryDto {
  @ApiProperty({ example: "SALE", description: "Tên danh mục" })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional({ example: true, default: true, description: 'Trạng thái hoạt động' })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
  @ApiPropertyOptional({
    example: '1',
    description: 'ID người tạo (bigint dưới dạng string)',
  })
  @IsNumberString()
  @IsOptional()
  createdBy?: string;
  @ApiPropertyOptional({
    example: 'uuid‑parent',
    description: 'ID danh mục cha (null nếu không có)',
  })
  @IsNumberString()
  @IsOptional()
  parentId?: string;
}
export class CategoryDtoBase {
  @ApiProperty({ example: "uuid-1234" })
  id: string;
  @ApiProperty({ example: "SALE" })
  name: string;
  @ApiPropertyOptional({
    example: 'uuid‑parent',
    description: 'ID danh mục cha (nullable)',
  })
  parentId?: string;
}
export class CategoryDto extends IntersectionType(CategoryDtoBase, AuditMetadataDto) { }
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }
