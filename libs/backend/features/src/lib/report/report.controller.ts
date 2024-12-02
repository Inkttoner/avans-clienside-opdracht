import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { ReportService } from './report.service';
import {GameService} from '../game/game.service'
import { IReport } from '@avans-nx-workshop/shared/api';
import { CreateReportDto } from '@avans-nx-workshop/backend/dto';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService,
                private readonly gameService: GameService
    ) {}

    @Get()
    async findAll(): Promise<IReport[]> {
        return this.reportService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IReport | null> {
        const game = await this.gameService.findOne(id);
        if (!game){
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
        return await this.reportService.findForGame(game);
    }

    @Post('')
    create(@Body() game: CreateReportDto): Promise<IReport> {
        return this.reportService.create(game);
    }

    // @Put(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() game: UpdateGameDto
    // ): Promise<IReport | null> {
    //     return this.reportService.update(id, game);
    // }
}