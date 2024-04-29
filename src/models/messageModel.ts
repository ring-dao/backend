import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  message: string;
  date: Date;
  senderKeyImage: string;
  proposalId: string;  
}

const messageSchema: Schema<IMessage> = new Schema<IMessage>({
    message: { type: String, required: true },
    date: { type: Date, required: true },
    senderKeyImage: { type: String, required: true },
    proposalId: { type: String, required: true },
});

export const RingDaoMessage = mongoose.model<IMessage>('Message', messageSchema);