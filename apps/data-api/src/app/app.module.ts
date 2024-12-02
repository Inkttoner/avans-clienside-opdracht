import { Module } from '@nestjs/common';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { GamesModule, ReportsModule} from '@avans-nx-workshop/backend/features';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
    imports: [  
        AuthModule,
        MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    // console.log('is connected');
                    Logger.verbose(
                        `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
                    );
                });
                connection._events.connected();
                return connection;
            }
        }),
        UsersModule,
        GamesModule,
        ReportsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
