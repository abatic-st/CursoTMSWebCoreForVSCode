import { Controller, Get, Param, Delete, Post, Body, Put, ValidationPipe, UseGuards } from '@nestjs/common';
import { WishListService } from '../services/wishlist.service';
import { ApiTags, ApiDefaultResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FilterWishListDto } from '../dto/wishlist/filterwishlist.dto';
import { WishListDto } from '../dto/wishlist/wishlist.dto';
import { DeleteResult } from 'typeorm';
import { CurrentUser } from 'src/auth/decorators/get.user.decorator';
import { UserEntity } from '../entities/user.entity';

@ApiTags('wishlist')
@Controller('wishlist')
@UseGuards(AuthGuard())
@ApiBearerAuth('Bearer')
export class WishListController{

    constructor(private readonly myService: WishListService) { }

    @Get()
    @ApiDefaultResponse({ description: 'Response All Items', type: [WishListDto]})
    findAllWishList(@CurrentUser() userauth: UserEntity): Promise<WishListDto[]>{
        return this.myService.getAllWishList(userauth);
    }

    @Get(':id')
    @ApiDefaultResponse({ description: 'Response One Item By Id', type: WishListDto})
    findWishListItemById(@Param('id') id: number): Promise<WishListDto>{
        return this.myService.getWishListById(id);
    }

    @Get('name/:name')
    @ApiDefaultResponse({ description: 'Response One Item By Name', type: [WishListDto]})
    findWishListByName(@CurrentUser() userauth: UserEntity, @Param('name') name: string): Promise<WishListDto[]>{
        return this.myService.getWishListByName(userauth, name);
    }

    @Post('paginate')
    @ApiDefaultResponse({ description: 'Response Items paginate', type: typeof Pagination })
    GetWishListPaginate(@CurrentUser() userauth: UserEntity, @Body(ValidationPipe) filter: FilterWishListDto): Promise<Pagination<WishListDto>> {
        return this.myService.getWishListPaginate(userauth, {limit: filter.rowNumber, page: filter.pageNumber}, filter);
    }

    @Post('appendWish')
    @ApiParam({ name: 'WishListData', description: 'Data for create Wish List Item', type: WishListDto})
    createOneWishListItem(@CurrentUser() userauth: UserEntity, @Body(ValidationPipe) newData: WishListDto): Promise<WishListDto> {
        return this.myService.createOneWishListItem(userauth, newData);
    }

    @Put(':id')
    @ApiParam({ name: 'updateWishListData', description: 'Data for update Wish List Item', type: WishListDto})
    updateOneUser(@Param('id') id: number, @Body(ValidationPipe) updateData: WishListDto): Promise<WishListDto>{
        return this.myService.updateOneWishList(id, updateData);
    }

    @Delete(':id')
    @ApiDefaultResponse({ description: 'Response if deleted row', type: DeleteResult})
    deleteWishListById(@Param('id') id: number ): Promise<DeleteResult>{
        return this.myService.deleteWishListById(id);
    }
}