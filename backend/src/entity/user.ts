import { AfterInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    SELLER = 'seller',
    BUYER = 'buyer'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',
            {unique: true})
    email: string;

    @Column('text')
    name: string;

    @Column('text')
    lastName: string;

    @Column('text')
    password: string;

    @Column('text')
    role: UserRole;
}
