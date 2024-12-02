import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import {
   IGame,
   IUser,
   IReport
} from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type ReportDocument = Report & Document;
 @Schema() export class Report implements IReport {
     
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Game'
    })
    game!: IGame;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    })
    manOfTheMatch!: IUser;

    @Prop({
        required: false,
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User',
        default: []
    })
    players: IUser[] = [];

    @Prop({
        required: false,
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User',
        default: []
    })
    goals: IUser[] = [];

    @Prop({
        required: false,
        type: [MongooseSchema.Types.ObjectId],
        ref: 'User',
        default: []
    })
    assists: IUser[] = [];

    @Prop({
        required: true,
        type: String,
        default: '0-0'
    })
    score!: string;

    @Prop({
        required: true,
        type: Number
    })
    rating!: number;

    @Prop({
        required: true,
        type: String
    })
    report!: string;
     
}

export const ReportSchema = SchemaFactory.createForClass(Report);