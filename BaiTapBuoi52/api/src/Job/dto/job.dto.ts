
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
} from '@nestjs/swagger';

import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';

import { AuditMetadataDto } from '@/shared/dto/AuditMetadata.dto';
import { WorkType } from '../enums/work-type.enum';

export class CreateJobDto {
  @ApiProperty({ example: 'c56a4180-65aa-42ec-a945-5fd21dec0538' })
   @IsNotEmpty({ message: 'Category ID is required' })
   @IsUUID('4', { message: 'category_id phải là định dạng UUID v4' }) 
  categoryId: string;
  
  @ApiProperty({ example: 'c56a4180-65aa-42ec-a945-5fd21dec0538' })
   @IsNotEmpty({ message: 'Company ID is required' })
   @IsUUID('4', { message: 'company_id phải là định dạng UUID v4' }) 
  companyId: string;

  @ApiProperty({ example: 'Senior Back-end Developer' })
  @IsNotEmpty()
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiPropertyOptional({
    example:
      'Phát triển và bảo trì các giao diện web, tối ưu hóa trải nghiệm người dùng và hiệu năng hệ thống.',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiPropertyOptional({
    example:
      'Có ít nhất 1 năm kinh nghiệm với React, TypeScript, HTML/CSS và RESTful API.',
  })
  @IsOptional()
  @IsString({ message: 'Requirement must be a string' })
  requirement?: string;

  @ApiPropertyOptional({
    example:
      'Lương tháng 13, thưởng dự án, bảo hiểm sức khỏe và hỗ trợ thiết bị làm việc.',
  })
  @IsOptional()
  @IsString({ message: 'Benefit must be a string' })
  benefit?: string;

  @ApiPropertyOptional({
    example: 2,
    nullable: true,
    description: 'Số năm kinh nghiệm yêu cầu',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Experience must be a number' })
  experience?: number | null;

  @ApiProperty({
    example: '2026-10-15', // Khớp với định dạng YYYY-MM-DD của kiểu DATE
    description: 'Hạn nộp hồ sơ theo định dạng YYYY-MM-DD',
  })
  @IsNotEmpty({ message: 'Due date is required' })
  @IsDateString({}, { message: 'due_date must be a valid ISO 8601 date string' })
  dueDate: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;

  @ApiPropertyOptional({
    example: 10000000,
    nullable: true,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Minimum salary must be a number' })
  minSalary?: number | null;

  @ApiPropertyOptional({
    example: 20000000,
    nullable: true,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Maximum salary must be a number' })
  maxSalary?: number | null;

  @ApiPropertyOptional({
    example: 'Đại học',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Qualification must be a string' })
  qualification?: string | null;

  @ApiProperty({
    example: 'PART_TIME',
    description:"Be carefull with enum "
  })
  @IsEnum(WorkType)
  workType?: string;
  @ApiPropertyOptional({
    example: '8 tiếng/ngày',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Working time must be a string' })
  workingTime?: string | null;
}

export class JobBase {
  @ApiProperty({ example: 'uuid-1234' })
  id!: string;
}

export class UpdateJobDto extends PartialType(CreateJobDto) {}

export class JobResponseDto extends IntersectionType(
  JobBase,
  CreateJobDto,
  AuditMetadataDto,
) {}
