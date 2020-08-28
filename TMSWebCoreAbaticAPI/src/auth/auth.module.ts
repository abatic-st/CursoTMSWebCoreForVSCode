import { Module } from '@nestjs/common';
import  { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../app/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../app/entities/user.entity';
import { UtilService } from '../config/service/util.service';
import { AuthController } from './controllers/auth.controller';
import { UsersRepository } from '../app/repositories/user.repository';
import { UserMapper } from '../app/mappers/user.mapper';
import { CurrentUser } from './decorators/get.user.decorator';

@Module({
    imports: [
        TypeOrmModule.forFeature([
          UserEntity
        ]),
        PassportModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
              defaultStrategy: configService.get<string>("jwtStrategy", 'jwt')
            }),
            inject: [ConfigService]
          }),
          JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => (
              {
                secret: configService.get<string>("jwtSecret", "lavidaesasi2020"),
                signOptions: {
                  expiresIn: configService.get<number>("jwtExpire", 3600)
                }
              }),
            inject: [ConfigService]
          }),
    ],
    controllers: [
      AuthController,
    ],
    providers: [
        JwtStrategy,
        UsersRepository,
        UserMapper,
        UsersService,
        UtilService,
        ConfigService,
    ],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule {}
