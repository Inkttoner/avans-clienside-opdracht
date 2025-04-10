// import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { IToken, IUserRegistration } from './auth.interface';
import { Id } from './id.type';
import { IEntity } from './entity.interface';

export enum UserRole{
    Admin = 'Admin',
    User = 'User',
}

export enum UserGender {
    Male = 'Male',
    Female = 'Female',
    None = 'None',
    Unknown = 'Unknown'
}

export interface IUser extends IEntity {
    name: string;
    password: string;
    emailAddress: string;
    role: UserRole;
    dateOfBirth: Date;
    token?: string;
    position?: string;
    goals: number;
    assists: number;
}

export interface IPlayer extends IUser {
    
}

export type ICreateUser = Pick<IUser, 'name' | 'password' | 'emailAddress' | 'dateOfBirth'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IPlayer;
