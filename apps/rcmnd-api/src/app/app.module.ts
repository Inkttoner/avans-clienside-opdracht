import { Neo4jBackendModule, Neo4jQuoteModule } from '@avans-nx-workshop/backend/neo4j';
import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j/dist';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        Neo4jModule.forRoot({
            scheme: 'neo4j+s',
            host: 'e7140161.databases.neo4j.io',
            port: 7687,
            username: 'neo4j',
            password: 'cicstyamQ6fuqMwIxHKSrZUJWpl1gH-nnknsxib0tBg',
        }),
        Neo4jBackendModule,
        Neo4jQuoteModule,
        ConfigModule.forRoot(),
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
