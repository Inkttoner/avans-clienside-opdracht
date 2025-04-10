import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsNumber,
    IsDate,
    IsMongoId,
    IsArray
} from 'class-validator';
import {
    ICreateGame,
    IGame,
    Id,
    IUser,
    ICreateReport
} from '@avans-nx-workshop/shared/api';

export class CreateReportDto implements ICreateReport {
    @IsMongoId()
    @IsNotEmpty()
    game!: string;

    @IsString()
    @IsNotEmpty()
    manOfTheMatch!: string;

    @IsArray()
    @IsOptional()
    players!: IUser[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    goals!: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    assists!: string[];

    @IsString()
    @IsNotEmpty()
    score!: string;

    @IsNumber()
    @IsNotEmpty()
    rating!: number;

    @IsString()
    @IsNotEmpty()
    reportText!: string;
}
