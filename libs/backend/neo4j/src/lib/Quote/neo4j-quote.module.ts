import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4JQuoteController } from './neo4j-quote.controller';
import { Neo4jQuoteService } from './neo4j-quote.service';

@Module({
    imports: [Neo4jModule],
    controllers: [Neo4JQuoteController],
    providers: [Neo4jQuoteService],
    exports: []
})
export class Neo4jQuoteModule {}
