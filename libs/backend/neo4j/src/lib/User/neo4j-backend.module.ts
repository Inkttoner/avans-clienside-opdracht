import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4JUserController } from './neo4j.controller';
import { Neo4JUserService } from './neo4j-users.service';


@Module({
    imports: [Neo4jModule],
    controllers: [Neo4JUserController],
    providers: [Neo4JUserService],
    exports: []
})
export class Neo4jBackendModule {}
