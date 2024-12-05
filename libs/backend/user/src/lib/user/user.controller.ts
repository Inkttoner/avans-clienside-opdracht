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

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<IPlayer[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUser | null> {
        return this.userService.findOne(id);
    }

    @Post('')
    @UseGuards(UserExistGuard)
    create(@Body() user: CreateUserDto): Promise<IUser> {
        return this.userService.create(user);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Promise<IPlayer | null> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<IPlayer | null> {
        return this.userService.delete(id);
    }
}
