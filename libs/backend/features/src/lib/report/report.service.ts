import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Report as ReportModel, ReportDocument } from './report.schema';
import { IGame, IReport } from '@avans-nx-workshop/shared/api';
import { CreateReportDto} from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ReportService {
    private readonly logger: Logger = new Logger(ReportService.name);

    constructor(
        @InjectModel(ReportModel.name) private reportModel: Model<ReportDocument> 
    ) {}

    async findAll(): Promise<IReport[]> {
        this.logger.log(`Finding all items`);
        const items = await this.reportModel.find();
        return items.map(item => this.mapToReport(item));
    }
  
    
    async findForGame(game: IGame): Promise<IReport| null> {
        this.logger.log(`Finding report for game`);
        var game_id = game._id;
        const item = await this.reportModel.findOne({game_id}).exec();
        return item;
    }

    async create(report: CreateReportDto): Promise<IReport> {
        this.logger.log(`Create report ${report.game}`);
        const createdItem = this.reportModel.create(report);
        return createdItem;
    }

    private mapToReport(item: ReportDocument): IReport {
        return {
            _id: item._id,
            game: item.game,
            players: item.players,
            goals: item.goals,
            assists: item.assists,
            rating: item.rating,
            report: item.report,
            score: item.score,
            manOfTheMatch: item.manOfTheMatch
        };
    }   
    
}
