import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from '../dto/users/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UserEntity) 
        private userRepo: Repository<UserEntity>,
        private myMapper: UserMapper) {}

    getAllUsers(): Promise<UserEntity[]> {
        return this.userRepo.find();
    }

    getUserById(id: number): Promise<UserEntity> {
        try {
            return this.userRepo.findOne(id);
        } catch(error) {
            throw new BadRequestException(error);
        }
    }

    getUserByEmail(email: string): Promise<UserEntity> {
        try {
            return this.userRepo.findOne({ where: { email } });
        } catch(error) {
            throw new BadRequestException(error);
        }
    }

    async newUser(userDTO: UserDto): Promise<UserEntity> {
        const newUser = this.myMapper.dtoToEntity(userDTO);
        return this.userRepo.save(newUser);
    }


    async updateUser(id: number, userDTO: UserDto): Promise<UserEntity> {
        const userToUpdate = await this.userRepo.findOne(id);
        
        userToUpdate.name = ( (userDTO.name !== undefined) && (userDTO.name !== null) ) ? userDTO.name : userToUpdate.name;
        userToUpdate.lastname = ( (userDTO.lastname !== undefined) && (userDTO.lastname !== null) ) ? userDTO.lastname : userToUpdate.lastname;
        userToUpdate.active = ( (userDTO.active !== undefined) && (userDTO.active !== null) ) ? userDTO.active : userToUpdate.active;
        userToUpdate.email = ( (userDTO.email !== undefined) && (userDTO.email !== null) ) ? userDTO.email : userToUpdate.email;
        
        return await this.userRepo.save(userToUpdate);
    }

    deleteUserById(id: number): Promise<DeleteResult> {
        return this.userRepo.delete(id);
    }

    getRepo(): Repository<UserEntity> {
        return this.userRepo;
    }

}