import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';


@Injectable()
export class Neo4JUserService {
    private readonly logger: Logger = new Logger(Neo4JUserService.name);

    constructor(private neo4jService: Neo4jService) {}

    async findAll(): Promise<any> {
        this.logger.log('findAll users');
        const results = await this.neo4jService.read(
            `MATCH (u:User) RETURN u`,
        );
        const users = results.records.map(
            (record: any) => record.get('u').properties 
        );
        return users;
    }

    

    async createUser(userId: string, name: string): Promise<any> {
        this.logger.log(`Creating user ${name}`);
        const result = await this.neo4jService.write(
            `
            CREATE (u:User {userID: $userId, naam: $name})
            RETURN u
            `,
            { userId, name }
        );
        return result.records[0].get('u').properties;
    }

    async getUserThatSaid(quoteId: string): Promise<any> {
        this.logger.log(`Getting user that said quote ${quoteId}`);
        const result = await this.neo4jService.read(
            `
            MATCH (u:User)-[:HEEFT_GEZEGD]->(q:Quote {id: $quoteId})
            RETURN u
            `,
            { quoteId }
        );
        return result.records[0].get('u').properties;
    }

}
