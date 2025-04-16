import { Body, Controller, Get, Post } from '@nestjs/common';
import { Neo4jQuoteService } from './neo4j-quote.service';

@Controller('quotes')
export class Neo4JQuoteController {
    constructor(private readonly neo4jService: Neo4jQuoteService) {}

    @Get('')
    async getAllQuotes(): Promise<any> {
        const results = await this.neo4jService.findAll();
        return results;
    }

    @Post('')
    async createQuote(
        @Body('userId') userId: string,
        @Body('quoteText') quoteText: string
    ): Promise<any> {
        const results = await this.neo4jService.createQuote(userId, quoteText);
        return results;
    }

    @Post('like')
    async likeQuote(
        @Body('userId') userId: string,
        @Body('quoteId') quoteId: string
    ): Promise<any> {
        return this.neo4jService.likeQuote(userId, quoteId);
    }

    @Post('dislike')
    async dislikeQuote(
        @Body('userId') userId: string,
        @Body('quoteId') quoteId: string
    ): Promise<any> {
        return this.neo4jService.dislikeQuote(userId, quoteId);
    }
}
