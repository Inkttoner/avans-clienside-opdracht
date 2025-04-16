import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { Neo4jBackendModule, Neo4JUserService } from '@avans-nx-workshop/backend/neo4j';
import { Neo4jModule } from 'nest-neo4j/dist';
// import { Meal, MealSchema } from '@avans-nx-workshop/backend/features';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
            // { name: Meal.name, schema: MealSchema },
         
        ]),
        Neo4jBackendModule,
        Neo4jModule
    ],
    controllers: [UserController],
    providers: [UserService, Neo4JUserService],
    exports: [UserService, MongooseModule]
})
export class UserModule {}
