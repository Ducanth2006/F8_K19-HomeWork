import { ApiProperty,ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateCompanyDto  {
    @ApiProperty({example:"12345"})
    @IsString()
    @IsNotEmpty()
    tax:string;
    @ApiProperty({example:"Công ty ai việt nam"})
    @IsString()
    @IsNotEmpty()
    name:string
    @ApiProperty({example:"AI-VN"})
    @IsString()
    @IsNotEmpty()
    nameEng:string
    @ApiProperty({example:"Kyanon Digital is a Vietnam based leading Digital & Technology Group empowering businesses to achieve Growth and Impact through Completed Technology"})
    @IsString()
    @IsNotEmpty()
    description:string
    @ApiProperty({example:"abc123@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email:string
    @ApiProperty({example:"0987662841"})
    @IsString()
    @IsNotEmpty()
    phone?:string
    @ApiPropertyOptional({example:"abc@gmail.com"})
    @IsOptional()
    @IsString()
    website?:string
    @ApiPropertyOptional({example:"12345"})
    @IsOptional()
    @IsNumber()
    rate?:number
    @ApiPropertyOptional({example:"http......."})
    @IsOptional()
    @IsString()
    logoUrl?:string
}
