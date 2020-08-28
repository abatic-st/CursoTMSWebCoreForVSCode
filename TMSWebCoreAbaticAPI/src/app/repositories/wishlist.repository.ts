import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, Like } from 'typeorm';
import { WishListDto } from '../dto/wishlist/wishlist.dto';
import { WishListEntity } from '../entities/wishlist.entity';
import { WishListMapper } from '../mappers/wishlist.mapper';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class WishListRepository {
    constructor(
        @InjectRepository(WishListEntity) 
        private wishlistRepo: Repository<WishListEntity>,
        private myMapper: WishListMapper,
        private userMapper: UserMapper) {}

    getAllWishList(user: UserEntity): Promise<WishListEntity[]> {
        return this.wishlistRepo.find({ where: { user: user.id }, relations: ['user']});
    }

    getWishListById(id: number): Promise<WishListEntity> {
        try {
            return this.wishlistRepo.findOne(id, { relations: ['user']});
        } catch(error) {
            throw new BadRequestException(error);
        }
    }

    getWishListByName(user: UserEntity, name: string): Promise<WishListEntity[]> {
        try {
            return this.wishlistRepo.find({ where: { user, name: Like(`%${name}%`) }, relations: ['user'] });
        } catch(error) {
            throw new BadRequestException(error);
        }
    }

    async newWishList(user: UserEntity, wishlistDTO: WishListDto): Promise<WishListEntity> {
        wishlistDTO.user = this.userMapper.entityToDto(user);
        const newWishList = this.myMapper.dtoToEntity(wishlistDTO);
        return this.wishlistRepo.save(newWishList);
    }


    async updateWishList(id: number, wishlistDTO: WishListDto): Promise<WishListEntity> {
        const wishlistsToUpdate = await this.wishlistRepo.findOne(id, { relations:['user']});
        wishlistsToUpdate.wishname = ( (wishlistDTO.wishname !== undefined) && (wishlistDTO.wishname !== null) ) ? wishlistDTO.wishname : wishlistsToUpdate.wishname;
        wishlistsToUpdate.wishgot = ( (wishlistDTO.wishgot !== undefined) && (wishlistDTO.wishgot !== null) ) ? wishlistDTO.wishgot : wishlistsToUpdate.wishgot;
        wishlistsToUpdate.wishdescription = ( (wishlistDTO.wishdescription !== undefined) && (wishlistDTO.wishdescription !== null) ) ? wishlistDTO.wishdescription : wishlistsToUpdate.wishdescription;
        wishlistsToUpdate.wishurl = ( (wishlistDTO.wishurl !== undefined) && (wishlistDTO.wishurl !== null) ) ? wishlistDTO.wishurl : wishlistsToUpdate.wishurl;
        wishlistsToUpdate.updatedat = new Date();
        console.log('tras cambios');
        console.log(wishlistsToUpdate);
        return await this.wishlistRepo.save(wishlistsToUpdate);
    }

    deleteWishListById(id: number): Promise<DeleteResult> {
        return this.wishlistRepo.delete(id);
    }

    getRepo(): Repository<WishListEntity> {
        return this.wishlistRepo;
    }

}