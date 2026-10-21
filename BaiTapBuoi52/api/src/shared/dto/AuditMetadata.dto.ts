import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class AuditMetadataDto {
  @ApiPropertyOptional({ example: '2026-10-15T14:30:00.000Z', nullable: true })
  @IsOptional()
  @IsDateString({}, { message: 'created_at must be a valid ISO 8601 date string' })
  created_at: string;

  @ApiPropertyOptional({ example: 'usr_123456', nullable: true })
  @IsOptional()
  @IsString({ message: 'created_by must be a string' })
  created_by?: string;

  @ApiPropertyOptional({ example: '2026-10-15T14:30:00.000Z', nullable: true })
  @IsOptional()
  @IsDateString({}, { message: 'modified_at must be a valid ISO 8601 date string' })
  modified_at?: string;

  @ApiPropertyOptional({ example: 'usr_123456', nullable: true })
  @IsOptional()
  @IsString({ message: 'modified_by must be a string' })
  modified_by?: string;

  @ApiPropertyOptional({ example: null, nullable: true })
  @IsOptional()
  @IsDateString({}, { message: 'deleted_at must be a valid ISO 8601 date string' })
  deleted_at?: string;

  @ApiPropertyOptional({ example: null, nullable: true })
  @IsOptional()
  @IsString({ message: 'deleted_by must be a string' })
  deleted_by?: string;

  @ApiProperty({ example: true, default: true })
  @IsOptional()
  @IsBoolean({ message: 'active must be a boolean' })
  active: boolean = true;
}