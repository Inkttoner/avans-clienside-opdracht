import {Module} from '@nestjs/common';
import {GameController} from './game.controller';
import {GameService} from './game.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Game, GameSchema} from './game.schema';
import {Report, ReportSchema} from '../report/report.schema';
import { ReportService } from '../report/report.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Game.name, schema: GameSchema },
            {name: Report.name, schema: ReportSchema }
        ])
    ],
    controllers: [GameController],
    providers: [GameService, ReportService],
    exports: [GameService]
})
export class GamesModule {}
