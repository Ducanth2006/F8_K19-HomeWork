import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCompanyAddressDto {
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID của công ty',
  })
  @IsNotEmpty({ message: 'companyId is required' })
  @IsUUID('4', { message: 'companyId must be a valid UUID' })
  companyId: string;

  @ApiProperty({
    example: 1,
    description: 'ID của Tỉnh/Thành phố',
  })
  @IsNotEmpty({ message: 'provinceId is required' })
  @IsNumber({}, { message: 'provinceId must be a number' })
  provinceId: number;

  @ApiProperty({
    example: 101,
    description: 'ID của Phường/Xã',
  })
  @IsNotEmpty({ message: 'wardId is required' })
  @IsNumber({}, { message: 'wardId must be a number' })
  wardId: number;

  @ApiPropertyOptional({
    example: 'Số 123 Đường Trần Phú, Phường Mộ Lao',
    description: 'Địa chỉ chi tiết (số nhà, tên đường...)',
  })
  @IsOptional()
  @IsString({ message: 'addressDetail must be a string' })
  addressDetail?: string;
}