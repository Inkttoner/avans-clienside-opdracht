import { IEntity } from './entity.interface';
import { IPlayer, IUser} from './user.interface';

export interface IGame extends IEntity {
    date: Date;
    opponent: string;
    isHomeGame: boolean;
    fee: number;
    time: string;
    timeToGather: string;
    players: IPlayer[];
    isPlayed: boolean;
}

export type ICreateGame = Pick<IGame, 'date' | 'opponent' | 'isHomeGame' | 'time' | 'timeToGather'>;
export type IUpdateGame = Partial<Omit<IGame, 'id'>>;
export type IUpsertGame = IGame;