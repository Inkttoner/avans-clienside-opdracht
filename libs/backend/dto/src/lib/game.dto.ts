import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ICreateGame, IGame, Id,IUser, IPlayer } from '@avans-nx-workshop/shared/api';

export class CreateGameDto implements ICreateGame {
    @Type(()=> Date)
    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @IsString()
    @IsNotEmpty()
    opponent!: string;

    @IsBoolean()
    @IsNotEmpty()
    isHomeGame!: boolean;

    @IsString()
    @IsNotEmpty()
    time!: string;

    @IsString()
    @IsNotEmpty()
    timeToGather!: string;
}

export class UpdateGameDto implements IGame {
    _id!: Id;

    @IsDate()
    @IsOptional()
    date!: Date;

    @IsString()
    @IsOptional()
    opponent!: string;

    @IsBoolean()
    @IsOptional()
    isHomeGame!: boolean;

    @IsString()
    @IsOptional()
    time!: string;

    @IsString()
    @IsOptional()
    timeToGather!: string;

    @IsNumber()
    @IsOptional()
    fee: number = 0;


    @IsOptional()
    players: IPlayer[] = [];

    @IsBoolean()
    @IsOptional()
    isPlayed: boolean = false;

}