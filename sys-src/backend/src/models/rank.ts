import { Schema, Document, model } from 'mongoose';

interface IRank extends Document {
    name: string;
    points: number;
}

const rankSchema = new Schema<IRank>({
    name: { type: String, required: true },
    points: { type: Number, required: true },
});

const Rank = model<IRank>('Rank', rankSchema);

export { Rank, IRank };
