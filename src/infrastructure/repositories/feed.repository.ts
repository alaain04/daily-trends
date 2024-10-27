import { Feed } from '@src/domain/feed/feed.entities';
import FeedModel from '../database/models/feed.model';
import { FeedRepository } from '@src/domain/feed/feed.interface';

export default class FeedRepositoryImpl implements FeedRepository {
    async create(feed: Feed): Promise<Feed> {
        const newFeed = new FeedModel(feed);
        return newFeed.save();
    }

    async update(_id: string, feed: Feed): Promise<Feed | null> {
        return FeedModel.findOneAndUpdate({ _id }, feed, { new: true });
    }

    async getById(_id: string): Promise<Feed | null> {
        return FeedModel.findById(_id);
    }

    async delete(_id: string): Promise<Feed | null> {
        return FeedModel.findByIdAndDelete({ _id });
    }

    async findUnique(
        newspaperId: string,
        feedId: string
    ): Promise<Feed | null> {
        return FeedModel.findOne({ newspaperId, feedId });
    }

    async retrieveFeedByDate(dateFrom: Date, dateTo: Date): Promise<Feed[]> {
        return FeedModel.find({
            publishedAt: { $gte: dateFrom, $lte: dateTo },
        });
    }
}
