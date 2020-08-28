import { ApiProperty } from '@nestjs/swagger';

export class UserDto{

    @ApiProperty({ name: 'id', description:'primary key of row', type: Number, required: true })
    readonly id?: number;

    @ApiProperty({ name: 'createdAt', description:'date when row created', type: Date, required: false })
    readonly createdat?: Date;

    @ApiProperty({ name: 'updatedAt', description:'last date when row update', type: Date, required: false })
    updatedat?: Date;

    @ApiProperty({ name: 'name', description:'user name', type: String, maxLength: 50, required: true })
    name?: string;
    
    @ApiProperty({ name: 'lastname', description:'user last name', type: String, maxLength: 100, required: false })
    lastname?: string;

    @ApiProperty({ name: 'email', description:'user email', type: String, maxLength: 150, required: true })
    email?: string;

    @ApiProperty({ name: 'password', description:'user password', type: String, maxLength: 100, required: true })
    password?: string;

    @ApiProperty({ name: 'active', description:'user is active?', type: Boolean, required: false })
    active?: boolean;

    @ApiProperty({ name: 'salt', description:'salt to passwod', type: String, required: false })
    salt?: string;

    constructor(id: number, createdAt: Date, updatedAt: Date, name: string, lastname: string, email: string, password: string, active: boolean, salt: string) {
        this.id = ( (id !== undefined) && (id !== null) ) ? id : null;
        this.createdat = ( (createdAt !== undefined) && (createdAt !== null)) ? createdAt : null;
        this.updatedat = ( (updatedAt !== undefined) && (updatedAt !== null)) ? updatedAt : new Date();
        this.name = ( (name !== undefined) && (name !== null) ) ? name : null;
        this.lastname = ( (lastname !== undefined) && (lastname !== null) ) ? lastname : null;
        this.email = ( (email !== undefined) && (email !== null) ) ? email : null;
        this.password = ( (password !== undefined) && (password !== null) ) ? password : null;
        this.active = ( (active !== undefined) && (active !== null) ) ? active : true;
        this.salt = ( (salt !== undefined) && (salt !== null) ) ? salt : null;
    }    
}