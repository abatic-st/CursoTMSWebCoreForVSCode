import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { WishListEntity } from '../entities/wishlist.entity';
import { UtilService } from '../../config/service/util.service';
import { WishListDto } from '../dto/wishlist/wishlist.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { WishListRepository } from '../repositories/wishlist.repository';
import * as bcrypt from 'bcrypt';
import { WishListMapper } from '../mappers/wishlist.mapper';
import { DeleteResult, Like } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { FilterWishListDto } from '../dto/wishlist/filterwishlist.dto';

@Injectable()
export class WishListService {

    constructor(
        private myRepo: WishListRepository,
        private myMapper: WishListMapper,
        private utils: UtilService) {}

    private async hasPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }

    async getAllWishList(authUser: UserEntity): Promise<WishListDto[]> {
        const wishlist: WishListEntity[] = await this.myRepo.getAllWishList(authUser);
        return wishlist.map( wishlistitem => this.myMapper.entityToDto(wishlistitem));
    }

    async getWishListById(id: number): Promise<WishListDto> {
        if (this.utils.valueHasData(id) == true) {
            const wishlist: WishListEntity = await this.myRepo.getWishListById(id);
            return this.myMapper.entityToDto(wishlist);
        }
    }

    async getWishListByName(authUser: UserEntity, name: string): Promise<WishListDto[]>{
        if (this.utils.valueHasData(name) == true) {
            const wishlist: WishListEntity[] = await this.myRepo.getWishListByName(authUser, name);
            if (this.utils.valueHasData(wishlist) == true) {
                return  wishlist.map( wishlistitem => this.myMapper.entityToDto(wishlistitem));
            }
        }
    }

    async createOneWishListItem(authUser: UserEntity, newValue: WishListDto): Promise<WishListDto> {
        if (this.utils.valueHasData(newValue) == true) {
            try {
                const newWishList: WishListEntity = await this.myRepo.newWishList(authUser, newValue);
                return this.myMapper.entityToDto(newWishList);
            } catch (error) {
                throw new InternalServerErrorException(error);
            }
        }
    }

    async updateOneWishList(id: number, updateValue: WishListDto): Promise<WishListDto> {
        if ( (this.utils.valueHasData(updateValue) == true) && (this.utils.valueHasData(id) == true) ) {
            const updateWishListItem = await this.myRepo.updateWishList(id, updateValue);
            return this.myMapper.entityToDto(updateWishListItem);
        }
    }

    async getWishListPaginate(authUser: UserEntity, options: IPaginationOptions, filtro: FilterWishListDto): Promise< Pagination< WishListEntity > > {
        const condition: any = { };
        condition.user = authUser;
        if (this.utils.valueHasData(filtro) == true) {
            if (this.utils.valueHasData(filtro.name) == true) {
                condition.name = Like(`%${filtro.name}%`);
            }
            if (this.utils.valueHasData(filtro.description) == true) {
                condition.description = Like(`%${filtro.description}%`);
            }
            if (this.utils.valueHasData(filtro.wishgot) == true) {
                condition.wishgot = filtro.wishgot;
            }
            if (this.utils.valueHasData(filtro.id) == true) {
                condition.id = filtro.id;
            }
        }
        return paginate<WishListEntity>(this.myRepo.getRepo(), options, { where: condition });
    }

    async deleteWishListById(id: number): Promise<DeleteResult> {
        return this.myRepo.deleteWishListById(id);
    }
} 