import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsDate, IsDateString } from 'class-validator';
import {
    // ICreateUser,
    IUpdateUser,
    IUpsertUser,
    IUserRegistration,
    Id,
    UserGender,
    UserRole,
} from '@avans-nx-workshop/shared/api';

export class CreateUserDto implements IUserRegistration {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;

    @IsDateString()
    @IsNotEmpty()
    dateOfBirth!: Date;

}

export class UpsertUserDto implements IUpsertUser {
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;

    @IsString()
    @IsNotEmpty()
    role: UserRole = UserRole.User;

    @IsString()
    @IsNotEmpty()
    position = '';

    @IsDate()
    @IsNotEmpty()
    dateOfBirth!: Date;

    goals = 0;
    assists = 0;
}

export class UpdateUserDto implements IUpdateUser {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    name!: string;
}
