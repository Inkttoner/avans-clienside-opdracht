import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import {
   IGame,
   IPlayer,
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type GameDocument = Game & Document;
 @Schema() export class Game implements IGame {
     
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: Date
    })
    date!: Date;

    @Prop({
        required: true,
        type: String
    })
    opponent!: string;

    @Prop({
        required: true,
        type: Boolean
    })
    isHomeGame!: boolean;
    
    @Prop({
        required: false,
        type: Number,
        default: 0
    })
    fee: number = 0;

    @Prop({
        required: true,
        type: String
    })
    time!: string;

    @Prop({
        required: true,
        type: String
    })
    timeToGather!: string;

    @Prop({
        required: false,
        type: [String],
        default: []
    })
    players: IPlayer[] = [];

    @Prop({
        required: false,
        type: Boolean,
        default: false
    })
    isPlayed: boolean = false;
     
}

export const GameSchema = SchemaFactory.createForClass(Game);