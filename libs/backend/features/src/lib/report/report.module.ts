import {Module} from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import {MongooseModule} from '@nestjs/mongoose';
import { GamesModule } from '../game/game.module';
import {Report, ReportSchema} from './report.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Report.name, schema: ReportSchema }
        ]),
        GamesModule
    ],
    controllers: [ReportController],
    providers: [ReportService],
    exports: [ReportService]
})
export class ReportsModule {}
