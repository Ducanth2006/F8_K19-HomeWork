import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProvinceDto {
  @ApiProperty({
    example: 'Hà Nội',
    description: 'Tên Tỉnh/Thành phố',
  })
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;
}