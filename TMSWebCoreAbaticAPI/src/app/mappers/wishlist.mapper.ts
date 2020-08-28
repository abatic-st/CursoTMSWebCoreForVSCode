import { WishListDto } from "../dto/wishlist/wishlist.dto";
import { WishListEntity } from "../entities/wishlist.entity";
import { UserMapper } from './user.mapper';

export class WishListMapper {

    dtoToEntity(wishlistDTO: WishListDto): WishListEntity {
        const userMapper = new UserMapper();
        return new WishListEntity(wishlistDTO.id, wishlistDTO.createdat, wishlistDTO.updatedat,  userMapper.dtoToEntity(wishlistDTO.user), wishlistDTO.wishname,
            wishlistDTO.wishdescription, wishlistDTO.wishurl, wishlistDTO.wishgot);
    }

    entityToDto(wishlistEntity: WishListEntity): WishListDto {
        const userMapper = new UserMapper();
        return new WishListDto(wishlistEntity.id, wishlistEntity.createdat, wishlistEntity.updatedat, userMapper.entityToDto(wishlistEntity.user), wishlistEntity.wishname,
            wishlistEntity.wishdescription, wishlistEntity.wishurl, wishlistEntity.wishgot);
    }

}