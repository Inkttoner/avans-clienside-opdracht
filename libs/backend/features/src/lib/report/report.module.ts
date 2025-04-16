import {Module} from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import {MongooseModule} from '@nestjs/mongoose';
import { GamesModule } from '../game/game.module';
import {Report, ReportSchema} from './report.schema';
import { UserModule } from '../../../../user/src/lib/users.module';
import {AuthModule} from '@avans-nx-workshop/backend/auth';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Report.name, schema: ReportSchema }
        ]),
        GamesModule,
        UserModule,
        AuthModule
    ],
    controllers: [ReportController],
    providers: [ReportService],
    exports: [ReportService]
})
export class ReportsModule {}
