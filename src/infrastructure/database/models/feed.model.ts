import { Schema, Model, model } from 'mongoose';

export interface IFeed {
    newspaperId: string;
    feedId: string;
    title: string;
    author: string;
    description: string;
    publishedAt: Date;
    createdAt: Date;
}

type FeedModel = Model<IFeed>;

const FeedSchema: Schema = new Schema<IFeed, FeedModel>({
    newspaperId: { type: String, required: true },
    feedId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

export default model<IFeed>('Feeds', FeedSchema);
