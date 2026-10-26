import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJobApplicationDto {
  @ApiProperty({
    example: 'c39a2829-22a4-44b4-a218-0997191316b1',
    description: 'ID của công việc ứng tuyển',
  })
  @IsNotEmpty({ message: 'jobId is required' })
  @IsUUID('4', { message: 'jobId must be a valid UUID' })
  jobId: string;

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID của ứng viên nộp hồ sơ',
  })
  @IsNotEmpty({ message: 'candidateId is required' })
  @IsUUID('4', { message: 'candidateId must be a valid UUID' })
  candidateId: string;

  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'ID của CV được đính kèm (nếu có)',
  })
  @IsUUID('4', { message: 'cvId must be a valid UUID' })
  cvId: string;

  @ApiPropertyOptional({
    example: 'Em đã có 2 năm kinh nghiệm làm ReactJS và NestJS...',
    description: 'Thư giới thiệu / Ghi chú của ứng viên',
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiPropertyOptional({
    example: 'PENDING',
    description: 'Trạng thái của hồ sơ (mặc định xử lý ở Service hoặc truyền vào)',
  })
  @IsOptional()
  @IsString({ message: 'status must be a string' })
  status?: string;
}