import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Entity({ name: 'wishlist' })
export class WishListEntity{

    @ApiProperty({description: 'Primary Key, autogenerated.', type: Number})
    @PrimaryGeneratedColumn( 'increment', { type: 'int', name: 'id' })
    readonly id: number;

    @ApiProperty({description: 'Created Date from data', type: Date})
    @Column( { nullable: true, type: 'timestamp without time zone',
        transformer: {
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
            from: (value: Date) => (value !== null) ? value.toLocaleString('ES', { timeZone: 'Atlantic/Canary'}) : value ,
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
            to: value => value } } )
    createdat: Date;

    @ApiProperty({description: 'Last updated Date', type: Date})
    @Column( { nullable: true, type: 'timestamp without time zone',
        transformer: {
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
            from: (value: Date) => (value !== null) ? value.toLocaleString('ES', { timeZone: 'Atlantic/Canary'}) : value ,
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
            to: value => value }  })
    updatedat: Date;

    @ApiProperty({ description: 'User', required: true, type: UserEntity, maxLength: 50 })
    @ManyToOne(  type => UserEntity, user => user.id, { nullable: false })
    @JoinColumn()
    user: UserEntity;

    @ApiProperty({ description: 'Wish Name', required: false, type: String, maxLength: 100 })
    @Column( { nullable: false, length: 100 })
    wishname: string;

    @ApiProperty({ description: 'Wish Description', required: false, type: String, maxLength: 150 })
    @Column( { nullable: true, length: 150 })
    wishdescription: string

    @ApiProperty({ description: 'Wish URL', required: false, type: String, maxLength: 100 })
    @Column( { nullable: true, length: 100 })
    wishurl: string;

    @ApiProperty({ description: 'Got Wish?', required: false, type: Boolean })
    @Column( { nullable: true })
    wishgot: boolean;
    
    constructor(id: number, createdAt: Date, updatedAt: Date, user: UserEntity, wishname: string, wishdescription: string,
        wishurl: string, wishgot: boolean) {
        this.id = ( (id !== undefined) && (id !== null) ) ? id : null;
        this.createdat = ( (createdAt !== undefined) && (createdAt !== null)) ? createdAt : new Date();
        this.updatedat = ( (updatedAt !== undefined) && (updatedAt !== null)) ? updatedAt : new Date();
        this.user = ( (user !== undefined) && (user !== null) ) ? user : null;
        this.wishname = ( (wishname !== undefined) && (wishname !== null) ) ? wishname : null;
        this.wishdescription = ( (wishdescription !== undefined) && (wishdescription !== null) ) ? wishdescription : null;
        this.wishurl = ( (wishurl !== undefined) && (wishurl !== null) ) ? wishurl : null;
        this.wishgot = ( (wishgot !== undefined) && (wishgot !== null) ) ? wishgot : true;
    }
}