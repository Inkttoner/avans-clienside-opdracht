import { IEntity } from './entity.interface';
import { IUser} from './user.interface';

export interface IGame extends IEntity {
    date: Date;
    opponent: string;
    isHomeGame: boolean;
    fee: number;
    time: string;
    timeToGather: string;
    players: IUser[];
    isPlayed: boolean;
}

export type ICreateGame = Pick<IGame, 'date' | 'opponent' | 'isHomeGame' | 'time' | 'timeToGather'>;
export type IUpdateGame = Partial<Omit<IGame, 'id'>>;
export type IUpsertGame = IGame;