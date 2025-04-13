import {
    Body,
    Controller,
    Get,
    HttpException,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { GameService } from './game.service';
import { IGame, IPlayer, IReport } from '@avans-nx-workshop/shared/api';
import { CreateGameDto, UpdateGameDto } from '@avans-nx-workshop/backend/dto';
import { ReportService } from '../report/report.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService, private readonly reportService: ReportService) {}

    @Get()
    async findAll(): Promise<IGame[]> {
        return this.gameService.findAll();
    }

    @Get('players/:id')
    async getPlayersFromGame(@Param('id') id: string): Promise<IPlayer[] | null> {
        return this.gameService.getPlayersFromGame(id);
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IGame | null> {
        return this.gameService.findOne(id);
    }

    @Post('')
    create(@Body() game: CreateGameDto): Promise<IGame> {
        return this.gameService.create(game);
    }

    @Get(':id/report')
    async getReportForGame(@Param('id') id: string): Promise<IReport | null> {
        const game = await this.gameService.findOne(id);
        if (!game || !game.report) {
            throw new HttpException('Report not found', 404);
        }
        const report = await this.reportService.findById(game.report);
        if (!report) {
            throw new HttpException('Report not found', 404);
        }
    
        return report;
    }

    @Put('addPlayer/:id')
    addPlayerToGame(
        @Param('id') id: string,
        @Body('player') player: IPlayer
    ): Promise<IGame | null> {
        if (!player) {
            throw new HttpException('Player not found', 404);
        }
        return this.gameService.addPlayerToGame(id, player);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() game: UpdateGameDto
    ): Promise<IGame | null> {
        return this.gameService.update(id, game);
    }
}