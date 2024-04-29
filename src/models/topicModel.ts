import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  title: string;
  date: Date;
  senderKeyImage: string;
  description: string;  
  likes: string; 
  dislikes: string;
}

const topicSchema: Schema<ITopic> = new Schema<ITopic>({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    senderKeyImage: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: String, required: true },
    dislikes: { type: String, required: true },
});

export const Topic = mongoose.model<ITopic>('Topic', topicSchema);