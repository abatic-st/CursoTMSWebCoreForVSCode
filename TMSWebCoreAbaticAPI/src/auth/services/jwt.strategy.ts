import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../config/interfaces/jwt-payload.interface';
import { UsersService } from '../../app/services/user.service';
import { UserEntity } from '../../app/entities/user.entity';
import { CredentialsUserDto } from '../dto/credentials.dto';
import { UtilService } from '../../config/service/util.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../../app/dto/users/user.dto';
import { UserMapper } from '../../app/mappers/user.mapper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly utils: UtilService,
        private jwtService: JwtService,
        private mapper: UserMapper) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>("jwtSecret", "asieslavida2020"),
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto> {
        const user: UserDto = await this.userService.getUserByEmail(payload.email);
        if (this.utils.valueHasData(user) == false ){
            throw new UnauthorizedException();
        }
        return user;
    }

    async validateUserPassword(credentials: CredentialsUserDto): Promise<{ accessToken: string}> {
        const user: UserDto = await this.userService.getUserByEmail(credentials.email );
        if (this.utils.valueHasData(user) == true) {
            const userEntity: UserEntity = this.mapper.dtoToEntity(user); 
            if ( (this.utils.valueHasData(user) == true)  && (await userEntity.validatePassword(credentials.password) == true)) {
                const payload: JwtPayload = { username: user.name, email: user.email };
                const accessToken = await this.jwtService.sign(payload);
                return { accessToken };
            } else {
                throw new UnauthorizedException('Invalid credentials');
            }
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

}