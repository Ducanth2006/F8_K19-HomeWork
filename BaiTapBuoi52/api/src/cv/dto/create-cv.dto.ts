import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCvDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID của ứng viên sở hữu CV',
  })
  @IsNotEmpty()
  @IsUUID('4', { message: 'candidateId must be a valid UUID' })
  candidateId: string;

  @ApiProperty({
    example: 'CV Fullstack Developer 2026',
    description: 'Tiêu đề/Tên gọi của CV',
  })
  @IsNotEmpty()
  @IsString({ message: 'title must be a string' })
  title: string;

  @ApiPropertyOptional({
    example: 'cv_nguyen_van_a.pdf',
    description: 'Tên file gốc người dùng tải lên',
  })
  @IsOptional()
  @IsString({ message: 'fileName must be a string' })
  fileName: string;

  @ApiPropertyOptional({
    example: 'uploads/cvs/2026/10/cv_nguyen_van_a_12345.pdf',
    description: 'Đường dẫn hoặc key lưu trữ trên Cloud/Storage (S3/MinIO)',
  })
  @IsOptional()
  @IsString({ message: 'fileKey must be a string' })
  fileKey: string;
}