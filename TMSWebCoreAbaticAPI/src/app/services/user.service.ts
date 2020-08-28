import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UtilService } from '../../config/service/util.service';
import { UserDto } from '../dto/users/user.dto';
import { FilterUserDto } from '../dto/users/filteruser.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UsersRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserMapper } from '../mappers/user.mapper';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        private myRepo: UsersRepository,
        private myMapper: UserMapper,
        private utils: UtilService) { }

    private async hasPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }

    async getAllUsers(): Promise<UserDto[]> {
        const users: UserEntity[] = await this.myRepo.getAllUsers();
        return users.map( user => this.myMapper.entityToDto(user));
    }

    async getUserById(id: number): Promise<UserDto> {
        if (this.utils.valueHasData(id) == true) {
            const user: UserEntity = await this.myRepo.getUserById(id);
            return this.myMapper.entityToDto(user);
        }
    }

    async getUserByEmail(email: string): Promise<UserDto>{
        if (this.utils.valueHasData(email) == true) {
            const user: UserEntity = await this.myRepo.getUserByEmail(email);
            if (this.utils.valueHasData(user) == true) {
                return this.myMapper.entityToDto(user);
            }
        }
    }

    async createOneUser(newValue: UserDto): Promise<UserDto> {
        if (this.utils.valueHasData(newValue) == true) {
            try {
                newValue.salt = await bcrypt.genSalt(); 
                newValue.password = await this.hasPassword(newValue.password, newValue.salt)
                const newUser: UserEntity = await this.myRepo.newUser(newValue);
                return this.myMapper.entityToDto(newUser);
            } catch (error) {
                if (error.code === '23505') {
                    throw new ConflictException('Email already exists');
                } else {
                    throw new InternalServerErrorException(error);
                }
            }
        }
    }

    async updateOneUser(id: number, updateValue: UserDto): Promise<UserDto> {
        if ( (this.utils.valueHasData(updateValue) == true) && (this.utils.valueHasData(id) == true) ) {
            const updateUser = await this.myRepo.updateUser(id, updateValue);
            return this.myMapper.entityToDto(updateUser);
        }
    }

    async getUsersPaginate(options: IPaginationOptions, filtro: FilterUserDto): Promise< Pagination< UserEntity > > {
        const condition: any = { };
        if (this.utils.valueHasData(filtro) == true) {
            if (this.utils.valueHasData(filtro.email) == true) {
                condition.email = filtro.email;
            }
            if (this.utils.valueHasData(filtro.lastname) == true) {
                condition.lastname = filtro.lastname;
            }
            if (this.utils.valueHasData(filtro.name) == true) {
                condition.name = filtro.name;
            }
            if (this.utils.valueHasData(filtro.id) == true) {
                condition.id = filtro.id;
            }
        }
        return paginate<UserEntity>(this.myRepo.getRepo(), options, { where: condition });
    }

    async deleteUserById(id: number): Promise<DeleteResult> {
        return this.myRepo.deleteUserById(id);
    }
} 