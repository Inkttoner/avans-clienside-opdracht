import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class Neo4jQuoteService {
    private readonly logger: Logger = new Logger(Neo4jQuoteService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    async findAll(): Promise<any> {
        this.logger.log('findAll quotes with authors');
        const results = await this.neo4jService.read(
            `
            MATCH (q:Quote)<-[:HEEFT_GEZEGD]-(u:User)
            RETURN q, u
            `
        );
        const quotes = results.records.map((record: any) => ({
            ...record.get('q').properties,
            author: record.get('u').properties.naam, // Include the author's name
        }));
        return quotes;
    }

    async createQuote(userId: string, quoteText: string): Promise<any> {
        this.logger.log(`Creating quote for user ${userId}`);
        const result = await this.neo4jService.write(
            `
            MATCH (u:User {userID: $userId})
            CREATE (q:Quote {inhoud: $quoteText, createdAt: datetime()})
            CREATE (u)-[:HEEFT_GEZEGD]->(q)
            RETURN q
            `,
            { userId, quoteText }
        );
        return result.records[0].get('q').properties;
    }

    async likeQuote(userId: string, quoteId: string): Promise<any> {
        this.logger.log(`User ${userId} likes quote ${quoteId}`);
        const result = await this.neo4jService.write(
            `
            MATCH (u:User {userID: $userId}), (q:Quote {quoteID: $quoteId})
            // Remove any existing DISLIKED relationship
            OPTIONAL MATCH (u)-[r:DISLIKED]->(q)
            DELETE r
            // Create the LIKED relationship
            MERGE (u)-[:LIKED]->(q)
            RETURN q
            `,
            { userId, quoteId }
        );
        return result.records[0]?.get('q').properties;
    }
    
    async dislikeQuote(userId: string, quoteId: string): Promise<any> {
        this.logger.log(`User ${userId} dislikes quote ${quoteId}`);
        const result = await this.neo4jService.write(
            `
            MATCH (u:User {userID: $userId}), (q:Quote {quoteID: $quoteId})
            // Remove any existing LIKED relationship
            OPTIONAL MATCH (u)-[r:LIKED]->(q)
            DELETE r
            // Create the DISLIKED relationship
            MERGE (u)-[:DISLIKED]->(q)
            RETURN q
            `,
            { userId, quoteId }
        );
        return result.records[0]?.get('q').properties;
    }
}
