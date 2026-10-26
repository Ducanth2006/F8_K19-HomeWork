import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Gender } from "../enums/enum.entity";

export class CreateCandidateDto {
    @ApiProperty({example:"Nguyên Văn Quyết"})
    @IsString()
    @IsNotEmpty()
    name:string;
    @ApiProperty({example:"098653251"})
    @IsString()
    @IsNotEmpty()
    phone:string;
    @ApiProperty({example:"nguyenVanQuyet@gmail.com"})
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string;
    @ApiPropertyOptional({example:Gender.OTHER,default:Gender.OTHER,enum:Gender})
    @IsOptional()
    @IsEnum(Gender,{ message: 'gender phải là male, female hoặc other' })
    gender?:Gender
    @ApiPropertyOptional({example:"2"})
    @IsOptional()
    @IsNumber()
    provinceId?:number;
    @ApiPropertyOptional({example:"2"})
    @IsOptional()
    @IsNumber()
    wardId?:number;
    @ApiPropertyOptional({example:"số 17 đường abc quận abc "})
    @IsOptional()
    @IsString()
    addressDetail?:string
}
