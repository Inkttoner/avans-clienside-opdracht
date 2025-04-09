import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, IsDate } from 'class-validator';
import { ICreateGame, IGame, Id,IUser, ICreateReport } from '@avans-nx-workshop/shared/api';


export class CreateReportDto implements ICreateReport {

    @IsString()
    @IsNotEmpty()
    game!: string;

    @IsString()
    @IsNotEmpty()
    manOfTheMatch!: IUser;

    @IsOptional()
    players: IUser[] = [];

    @IsOptional()
    goals: IUser[] = [];

    @IsOptional()
    assists: IUser[] = [];

    @IsString()
    @IsNotEmpty()
    score!: string;

    @IsNumber()
    @IsNotEmpty()
    rating!: number;

    @IsString()
    @IsNotEmpty()
    report!: string;
}