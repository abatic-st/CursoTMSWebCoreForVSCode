import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity{

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

    @ApiProperty({ description: 'User Name', required: true, type: String, maxLength: 50 })
    @Column({ nullable: false, length: 50 })
    name: string;

    @ApiProperty({ description: 'User Last Name', required: false, type: String, maxLength: 100 })
    @Column( { nullable: true, length: 100 })
    lastname: string;

    @ApiProperty({ description: 'User E-mail', required: true, type: String, maxLength: 150 })
    @Column( { nullable: false, length: 150 })
    email: string

    @ApiProperty({ description: 'User Password', required: true, type: String, maxLength: 100 })
    @Column( { nullable: false, length: 100 })
    password: string;

    @ApiProperty({ description: '¿User active?', required: true, type: Boolean })
    @Column( { nullable: false })
    active: boolean;

    @ApiProperty({ description: 'Salt to password', required: false, type: String })
    @Column({nullable: true, length: 50})
    salt?: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    constructor(id: number, createdAt: Date, updatedAt: Date, name: string, lastname: string, email: string,
        password: string, active: boolean, salt: string) {
        this.id = ( (id !== undefined) && (id !== null) ) ? id : null;
        this.createdat = ( (createdAt !== undefined) && (createdAt !== null)) ? createdAt : new Date();
        this.updatedat = ( (updatedAt !== undefined) && (updatedAt !== null)) ? updatedAt : new Date();
        this.name = ( (name !== undefined) && (name !== null) ) ? name : null;
        this.lastname = ( (lastname !== undefined) && (lastname !== null) ) ? lastname : null;
        this.email = ( (email !== undefined) && (email !== null) ) ? email : null;
        this.password = ( (password !== undefined) && (password !== null) ) ? password : null;
        this.active = ( (active !== undefined) && (active !== null) ) ? active : true;
        this.salt = ( (salt !== undefined) && (salt !== null) ) ? salt : null;
    }
}