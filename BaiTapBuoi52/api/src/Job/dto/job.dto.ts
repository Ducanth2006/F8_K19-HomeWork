
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
} from '@nestjs/swagger';

import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { AuditMetadataDto } from '@/shared/dto/AuditMetadata.dto';

export class CreateJobDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsNumber({}, { message: 'Category ID must be a number' })
  category_id!: number;

  @ApiProperty({ example: 2 })
  @IsNotEmpty({ message: 'Company ID is required' })
  @IsNumber({}, { message: 'Company ID must be a number' })
  company_id!: number;

  @ApiProperty({ example: 'Senior Back-end Developer' })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title!: string;

  @ApiProperty({
    example:
      'Phát triển và bảo trì các giao diện web, tối ưu hóa trải nghiệm người dùng và hiệu năng hệ thống.',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description!: string;

  @ApiProperty({
    example:
      'Có ít nhất 1 năm kinh nghiệm với React, TypeScript, HTML/CSS và RESTful API.',
  })
  @IsNotEmpty({ message: 'Requirement is required' })
  @IsString({ message: 'Requirement must be a string' })
  requirement!: string;

  @ApiProperty({
    example:
      'Lương tháng 13, thưởng dự án, bảo hiểm sức khỏe và hỗ trợ thiết bị làm việc.',
  })
  @IsNotEmpty({ message: 'Benefit is required' })
  @IsString({ message: 'Benefit must be a string' })
  benefit!: string;

  @ApiPropertyOptional({
    example: 2,
    nullable: true,
    description: 'Số năm kinh nghiệm yêu cầu',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Experience must be a number' })
  experience?: number | null;

  @ApiProperty({
    example: '2026-11-30',
    description: 'Hạn nộp hồ sơ theo định dạng YYYY-MM-DD',
  })
  @IsNotEmpty({ message: 'Due date is required' })
  @IsString()
  due_date!: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity!: number;

  @ApiPropertyOptional({
    example: 10000000,
    nullable: true,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Minimum salary must be a number' })
  min_salary?: number | null;

  @ApiPropertyOptional({
    example: 20000000,
    nullable: true,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Maximum salary must be a number' })
  max_salary?: number | null;

  @ApiPropertyOptional({
    example: 'Đại học',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Qualification must be a string' })
  qualification?: string | null;

  @ApiPropertyOptional({
    example: 'Part-time',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Work type must be a string' })
  work_type?: string | null;

  @ApiPropertyOptional({
    example: '8 tiếng/ngày',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Working time must be a string' })
  working_time?: string | null;
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
