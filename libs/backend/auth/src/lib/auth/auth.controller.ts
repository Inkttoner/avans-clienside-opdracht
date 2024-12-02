import {
    Controller,
    Request,
    Post,
    UseGuards,
    Logger,
    Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/decorators';
import {
    IUserCredentials,
    IUserInfo,
    IUserRegistration
} from '@avans-nx-workshop/shared/api';
import { CreateUserDto } from '@avans-nx-workshop/backend/dto';
import { UserExistGuard } from '@avans-nx-workshop/backend/user';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() credentials: IUserCredentials): Promise<IUserInfo> {
        this.logger.log('Login');
        return await this.authService.login(credentials);
    }

    @Public()
    @UseGuards(UserExistGuard)
    @Post('register')
    async register(@Body() user: CreateUserDto): Promise<IUserInfo> {
        this.logger.log('Register');
        return await this.authService.register(user);
    }
}
