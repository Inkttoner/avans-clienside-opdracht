import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Report as ReportModel, ReportDocument } from './report.schema';
import { IGame, IReport } from '@avans-nx-workshop/shared/api';
import { CreateReportDto, UpdateGameDto} from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ReportService {
    private readonly logger: Logger = new Logger(ReportService.name);

    constructor(
        @InjectModel(ReportModel.name) private reportModel: Model<ReportDocument> 
    ) {}

  
    
    async findForGame(game: IGame): Promise<IReport| null> {
        this.logger.log(`Finding report for game`);
        const game_id = game._id;
        console.log('game_id', game_id);
        const item = await this.reportModel.findOne({game: game_id}).exec();
        return item;
    }

    async create(report: CreateReportDto): Promise<IReport> {
        this.logger.log(`Creating report for game ${report.game}`);
        const createdItem = await this.reportModel.create(report);
        return this.mapToReport(createdItem);
    }

    async update(_id: string, report: UpdateGameDto): Promise<IReport | null> {
        this.logger.log(`Update report ${_id}`);
        return this.reportModel.findByIdAndUpdate({_id}, report);
    }
    
    async findById(_id: string): Promise<IReport | null> {
        this.logger.log(`Finding report with id ${_id}`);
        const report = await this.reportModel.findById(_id).exec();
        if (!report) {
            this.logger.debug('Report not found');
            return null;
        }
        return this.mapToReport(report);
    }


    private mapToReport(item: ReportDocument): IReport {
        return {
            game: item.game,
            _id: item._id,
            goals: item.goals,
            assists: item.assists,
            rating: item.rating,
            reportText: item.reportText,
            score: item.score,
            manOfTheMatch: item.manOfTheMatch
        };
    }   
    
}
