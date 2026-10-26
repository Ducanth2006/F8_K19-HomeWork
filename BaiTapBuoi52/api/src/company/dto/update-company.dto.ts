import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @ApiPropertyOptional({example:
        false
    })
    @IsOptional()
    @IsBoolean()
    active?:boolean;
}

