import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Delete
} from '@nestjs/common';
import { UserService } from './user.service';
import { IPlayer, IUser } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { UserExistGuard } from './user-exists.guard';
import { UserIsAdminGuard } from './user-isAdmin.guard';
import { Neo4JUserService } from '@avans-nx-workshop/backend/neo4j';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private neo4jUserService: Neo4JUserService) {}

    @Get()
    async findAll(): Promise<IPlayer[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUser | null> {
        return this.userService.findOne(id);
    }
    
    @Get('game/players/:gameId')
    async findAllForGame(@Param('gameId') gameId: string): Promise<IPlayer[]> {
        return this.userService.findAllForGame(gameId);
    }

    @Post('')
    @UseGuards(UserExistGuard)
    async create(@Body() user: CreateUserDto): Promise<IUser> {
        // Create the user in MongoDB
        const createdUser = await this.userService.create(user);
        console.log('Created user in MongoDB:', createdUser);

        await this.neo4jUserService.createUser(createdUser._id.toString(), user.name);

        return createdUser;
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Promise<IPlayer | null> {
        return this.userService.update(id, user);
    }

}
