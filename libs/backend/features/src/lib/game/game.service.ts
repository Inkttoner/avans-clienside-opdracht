import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game as GameModel, GameDocument } from './game.schema';
import { IGame, IPlayer } from '@avans-nx-workshop/shared/api';
import { CreateGameDto, UpdateGameDto} from '@avans-nx-workshop/backend/dto';

@Injectable()
export class GameService {
    private readonly logger: Logger = new Logger(GameService.name);

    constructor(
        @InjectModel(GameModel.name) private gameModel: Model<GameDocument> 
    ) {}

    async findAll(): Promise<IGame[]> {
        this.logger.log(`Finding all items`);
        const items = await this.gameModel.find();
        return items.map(item => this.mapToGame(item));
    }

    async findOne(_id: string): Promise<IGame | null> {
        this.logger.log(`finding game with id ${_id}`);
        const item = await this.gameModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    
    async getPlayersFromGame(_id: string): Promise<IPlayer[] | null> {
        this.logger.log(`Getting players from game with id ${_id}`);
        const game = await this.gameModel.findOne({ _id }).populate('players').exec();
        if (!game) {
            this.logger.debug('Game not found');
            return null;
        }
        return game.players; // Assuming 'players' is populated with User documents
    }

    async create(game: CreateGameDto): Promise<IGame> {
        this.logger.log(`Create game ${game.opponent}`);
        const createdItem = this.gameModel.create(game);
        return createdItem;
    }

    async update(_id: string, game: UpdateGameDto): Promise<IGame | null> {
        this.logger.log(`Update user ${game.opponent}`);
        return this.gameModel.findByIdAndUpdate({ _id }, game);
    }


    private mapToGame(item: GameDocument): IGame {
        return {
            _id: item._id,
            date: item.date,
            fee: item.fee,
            isHomeGame: item.isHomeGame,
            opponent: item.opponent,
            players: item.players,
            time: item.time,
            timeToGather: item.timeToGather,
            isPlayed: item.isPlayed,
        };
    }
    
}
