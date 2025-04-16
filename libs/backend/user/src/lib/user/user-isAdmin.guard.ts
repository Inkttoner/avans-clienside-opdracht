import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Observable } from 'rxjs';
import { UserRole } from '@avans-nx-workshop/shared/api';

@Injectable()
export class UserIsAdminGuard implements CanActivate {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest().user;
        return !!this.userModel.findOne({ _id: user._id, role: UserRole.Admin });
    }
    
}
