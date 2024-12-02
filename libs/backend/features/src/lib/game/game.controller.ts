import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { GameService } from './game.service';
import { IGame } from '@avans-nx-workshop/shared/api';
import { CreateGameDto, UpdateGameDto } from '@avans-nx-workshop/backend/dto';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    async findAll(): Promise<IGame[]> {
        return this.gameService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IGame | null> {
        return this.gameService.findOne(id);
    }

    @Post('')
    create(@Body() game: CreateGameDto): Promise<IGame> {
        return this.gameService.create(game);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() game: UpdateGameDto
    ): Promise<IGame | null> {
        return this.gameService.update(id, game);
    }
}