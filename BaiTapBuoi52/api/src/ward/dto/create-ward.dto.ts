import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWardDto {
  @ApiProperty({
    example: 1,
    description: 'ID của Tỉnh/Thành phố trực thuộc',
  })
  @IsNotEmpty({ message: 'provinceId is required' })
  @IsNumber({}, { message: 'provinceId must be a number' })
  provinceId: number;

  @ApiProperty({
    example: 'Phường Mộ Lao',
    description: 'Tên Phường/Xã',
  })
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;
}