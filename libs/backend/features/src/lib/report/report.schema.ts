import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import { IGame, IUser, IReport } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';
import { UserSchema } from 'libs/backend/user/src/lib/user/user.schema';

export type ReportDocument = Report & Document;
@Schema()
export class Report implements IReport {
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Game'
    })
    game!: string;

    @Prop({
        required: true,
        type: String,
        ref: 'User'
    })
    manOfTheMatch!: String;

    @Prop({
        required: false,
        type: [String],
        ref: 'User',
        default: []
    })
    goals: string[] = [];

    @Prop({
        required: false,
        type: [String],
        ref: 'User',
        default: []
    })
    assists: string[] = [];

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
    reportText!: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
