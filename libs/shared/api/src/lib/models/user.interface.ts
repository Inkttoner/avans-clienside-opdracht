// import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { IToken, IUserRegistration } from './auth.interface';
import { Id } from './id.type';
import { IEntity } from './entity.interface';

export enum UserRole {
    Player = 'Speler',
    Supporter = 'Supporter',
    Unknown = 'Unknown'
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
    gender: UserGender;
}

export interface IUserInfo extends IUser {
    position: string;
    goals: number;
    assists: number;
}

export type ICreateUser = Pick<IUser, 'name' | 'password' | 'emailAddress'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
