import { IEntity } from "./entity.interface";
import { IGame } from "./game.interface";
import { IUser } from "./user.interface";


export interface IReport extends IEntity {
    game : string;
    manOfTheMatch : IUser;
    players : IUser[];
    goals : IUser[];
    assists : IUser[];
    score : string;
    rating : number;
    reportText : string;
}

export type ICreateReport = Partial<Omit<IReport, 'id'>>;