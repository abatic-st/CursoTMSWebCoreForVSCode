import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../users/user.dto';

export class WishListDto{

    @ApiProperty({ name: 'id', description:'primary key of row', type: Number, required: true })
    readonly id?: number;

    @ApiProperty({ name: 'createdAt', description:'date when row created', type: Date, required: false })
    readonly createdat?: Date;

    @ApiProperty({ name: 'updatedAt', description:'last date when row update', type: Date, required: false })
    updatedat?: Date;

    @ApiProperty({ name: 'user', description:'user entity', type: String, maxLength: 50, required: true })
    user: UserDto;
    
    @ApiProperty({ name: 'wishname', description:'wish name', type: String, maxLength: 100, required: false })
    wishname?: string;

    @ApiProperty({ name: 'wishdescription', description:'wish description', type: String, maxLength: 150, required: false })
    wishdescription?: string;

    @ApiProperty({ name: 'wishurl', description:'wish url for visualization', type: String, maxLength: 100, required: false })
    wishurl?: string;

    @ApiProperty({ name: 'acwishgottive', description:'wish got?', type: Boolean, required: false })
    wishgot?: boolean;

    constructor(id: number, createdAt: Date, updatedAt: Date, user: UserDto, wishname: string, wishdescription: string, wishurl: string, wishgot: boolean) {
        this.id = ( (id !== undefined) && (id !== null) ) ? id : null;
        this.createdat = ( (createdAt !== undefined) && (createdAt !== null)) ? createdAt : new Date();
        this.updatedat = ( (updatedAt !== undefined) && (updatedAt !== null)) ? updatedAt : new Date();
        this.user = ( (user !== undefined) && (user !== null) ) ? user : null;
        this.wishname = ( (wishname !== undefined) && (wishname !== null) ) ? wishname : '';
        this.wishdescription = ( (wishdescription !== undefined) && (wishdescription !== null) ) ? wishdescription : '';
        this.wishurl = ( (wishurl !== undefined) && (wishurl !== null) ) ? wishurl : '';
        this.wishgot = ( (wishgot !== undefined) && (wishgot !== null) ) ? wishgot : false;
    }    
}