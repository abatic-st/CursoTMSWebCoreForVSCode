import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsUserDto {
  
    @IsEmail()
    @ApiProperty({ name: 'email', description:'user email', type: String, maxLength: 150, required: true })
    email: string;

    @MinLength(8)
    @MaxLength(20)    
    @ApiProperty({ name: 'password', description:'user password', type: String, maxLength: 100, required: true })
    password: string;
}