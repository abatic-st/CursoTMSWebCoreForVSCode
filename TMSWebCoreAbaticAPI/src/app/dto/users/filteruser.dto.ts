import { IsString, IsEmail, MaxLength, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {

    @ApiProperty( { name: 'id', description: 'identification row', type: Number, required: false})
    @IsInt()
    @IsOptional()
    id?: number;
    
    @ApiProperty({ name: 'name', description:'user name', type: String, maxLength: 50, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    name?: string;

    @ApiProperty({ name: 'lastname', description:'user last name', type: String, maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    lastname?: string;

    @ApiProperty({ name: 'email', description:'user email', type: String, maxLength: 150, required: true })
    @IsEmail()
    @IsOptional()
    @MaxLength(150)
    email?: string;

    @ApiProperty( { name: 'rowNumber', description: 'row number for pagination', type: Number, required: true})
    @IsInt()
    @IsNotEmpty()
    rowNumber: number;

    @ApiProperty( { name: 'pageNumber', description: 'page number for pagination', type: Number, required: true})
    @IsInt()
    @IsNotEmpty()
    pageNumber: number;    

}