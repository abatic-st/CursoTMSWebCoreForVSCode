import { Module } from '@nestjs/common';
/*Modules*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
/*Entities or Types*/
import { UserEntity } from './entities/user.entity';
import { WishListEntity } from './entities/wishlist.entity';
/*Services*/
import { UsersService } from './services/user.service';
import { WishListService } from './services/wishlist.service';
/*Controllers or Resolvers*/
import { UserController } from './controllers/user.controller';
import { WishListController } from './controllers/wishlist.controller';
import { UsersRepository } from './repositories/user.repository';
import { WishListRepository } from './repositories/wishlist.repository';
import { UserMapper } from './mappers/user.mapper';
import { WishListMapper } from './mappers/wishlist.mapper';
import { UtilService } from '../config/service/util.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      WishListEntity
    ]),
    AuthModule,
  ],
  controllers: [
    UserController,
    WishListController
  ],
  providers: [
    UserMapper,
    UsersService,
    UsersRepository,
    UtilService,
    WishListMapper,
    WishListRepository,
    WishListService,
  ]
})
export class AppRestModule {}
