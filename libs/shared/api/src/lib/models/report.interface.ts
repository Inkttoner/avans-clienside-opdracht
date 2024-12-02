import { IEntity } from "./entity.interface";
import { IGame } from "./game.interface";
import { IUser } from "./user.interface";


export interface IReport extends IEntity {
    game : IGame;
    manOfTheMatch : IUser;
    players : IUser[];
    goals : IUser[];
    assists : IUser[];
    score : string;
    rating : number;
    report : string;
}

export type ICreateReport = Partial<Omit<IReport, 'id'>>;