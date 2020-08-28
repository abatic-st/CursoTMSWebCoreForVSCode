import { IsString, IsEmail, MaxLength, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterWishListDto {

    @ApiProperty( { name: 'id', description: 'identification row', type: Number, required: false})
    @IsInt()
    @IsOptional()
    id?: number;
    
    @ApiProperty({ name: 'name', description:'wieh list name', type: String, maxLength: 50, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    name?: string;

    @ApiProperty({ name: 'description', description:'wish list description', type: String, maxLength: 100, required: false })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    description?: string;

    @ApiProperty({ name: 'wishgot', description:'wish got', type: Boolean, required: false })
    @IsEmail()
    @IsOptional()
    @MaxLength(150)
    wishgot?: boolean;

    @ApiProperty( { name: 'rowNumber', description: 'row number for pagination', type: Number, required: true})
    @IsInt()
    @IsNotEmpty()
    rowNumber: number;

    @ApiProperty( { name: 'pageNumber', description: 'page number for pagination', type: Number, required: true})
    @IsInt()
    @IsNotEmpty()
    pageNumber: number;    

}