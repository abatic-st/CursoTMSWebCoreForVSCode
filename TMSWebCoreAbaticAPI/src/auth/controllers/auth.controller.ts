import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { CredentialsUserDto } from '../dto/credentials.dto';
import { JwtStrategy } from '../../auth/services/jwt.strategy';
import { ApiTags, ApiParam } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController{

    constructor(private readonly authService: JwtStrategy) { }

    @Post('signin')
    @ApiParam({ name: 'credentialsUser', description:'email and passwor', type: CredentialsUserDto})
    signIn(@Body(ValidationPipe) authcredentials: CredentialsUserDto): Promise<{accessToken: string}>{
        return this.authService.validateUserPassword(authcredentials);
    }

}