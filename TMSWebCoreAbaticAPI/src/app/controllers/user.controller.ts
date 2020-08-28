import { Controller, Get, Param, Delete, Post, Body, Put, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { ApiTags, ApiDefaultResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FilterUserDto } from '../dto/users/filteruser.dto';
import { UserDto } from '../dto/users/user.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('users')
@Controller('users')
export class UserController{

    constructor(private readonly myService: UsersService) { }

    @UseGuards(AuthGuard())
    @Get()
    @ApiDefaultResponse({ description: 'Response All Items', type: [UserDto]})
    @ApiBearerAuth('Bearer')
    findAllUsers(): Promise<UserDto[]>{
        return this.myService.getAllUsers();
    }

    @UseGuards(AuthGuard())
    @Get(':id')
    @ApiDefaultResponse({ description: 'Response One Item By Id', type: UserDto})
    @ApiBearerAuth()
    findUserById(@Param('id') id: number): Promise<UserDto>{
        return this.myService.getUserById(id);
    }

    @UseGuards(AuthGuard())
    @Get('email/:email')
    @ApiDefaultResponse({ description: 'Response One Item By Name', type: UserDto})
    @ApiBearerAuth()
    findUserByEmail(@Param('email') email: string): Promise<UserDto>{
        return this.myService.getUserByEmail(email);
    }

    @UseGuards(AuthGuard())
    @Get('paginate')
    @ApiBearerAuth('Bearer')
    @ApiDefaultResponse({ description: 'Response Items paginate', type: typeof Pagination })
    GetUsersPaginate(@Body(ValidationPipe) filter: FilterUserDto): Promise<Pagination<UserEntity>> {
        return this.myService.getUsersPaginate({limit: filter.rowNumber, page: filter.pageNumber}, filter);
    }

    @Post('appendUser')
    @ApiParam({ name: 'createUserData', description: 'Data for create user', type: UserDto})
    createOneUser(@Body(ValidationPipe) newData: UserDto): Promise<UserDto> {
        return this.myService.createOneUser(newData);
    }

    @UseGuards(AuthGuard())
    @Put(':id')
    @ApiParam({ name: 'updateUserData', description: 'Data for update user', type: UserDto})
    @ApiBearerAuth()
    updateOneUser(@Param('id') id: number, @Body(ValidationPipe) updateData: UserDto): Promise<UserDto>{
        return this.myService.updateOneUser(id, updateData);
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    @ApiBearerAuth()
    @ApiDefaultResponse({ description: 'Response if deleted row', type: DeleteResult})
    deleteUserById(@Param('id') id: number ): Promise<DeleteResult>{
        return this.myService.deleteUserById(id);
    }
}