import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import {
   IGame,
   IPlayer,
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';
import {UserSchema} from '../../../../user/src/lib/user/user.schema';

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
        type: [UserSchema],
        default: []
    })
    players: IPlayer[] = [];

    @Prop({
        required: false,
        type: Boolean,
        default: false
    })
    isPlayed: boolean = false;

    @Prop({
        required: false,
        type: String
    })
    score?: string;
 
    @Prop({
        required: false,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Report' // Reference to the Report model
    })
    report?: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);