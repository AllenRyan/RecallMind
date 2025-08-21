import mongoose, { Schema, models, model } from 'mongoose';

import { Types } from 'mongoose';

export interface ISummary {
  _id?: Types.ObjectId; // optional if the document hasn't been saved yet
  userId: Types.ObjectId; // Reference to User
  title: string;
  sourceType: 'youtube' | 'article' | 'text'; // enum
  content: string;
  summary: string;
  bulletPoints?: string[]; // optional array
  tldr: string;
  tags?: string[]; // optional array
  createdAt?: Date; // added by timestamps
  updatedAt?: Date;
}

const summarySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    
    sourceType: {
        type: String,
        enum: ['youtube', 'article', 'text'],
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    summary: {
        type: String,
        required: true,
    },

    bulletPoints: [{
        type: String,
    }],

    tldr: {
        type: String,
        required: true,
    },

    tags: [{
        type: String,
    }],


}, { timestamps: true })

const Summary = models?.Summary || model('Summary', summarySchema)
export default Summary;