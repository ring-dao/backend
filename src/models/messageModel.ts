import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  message: string;
  date: Date;
  ownerKeyImage: string;
  proposalId: string;  
}

const messageSchema: Schema<IMessage> = new Schema<IMessage>({
    message: { type: String, required: true },
    date: { type: Date, required: true },
    ownerKeyImage: { type: String, required: true },
    proposalId: { type: String, required: true },
});

export const RingDaoMessage = mongoose.model<IMessage>('Message', messageSchema);