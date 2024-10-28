import { IFeed } from '@src/domain/feed/feed.entities';
import { IFeedRepository } from '@src/domain/feed/feed.interface';
import { AnyBulkWriteOperation } from 'mongoose';
import { IBulkInsert } from '@src/domain/common/bulk-insert';
import FeedModel from '../models/feed.model';

export default class FeedRepositoryImpl implements IFeedRepository {
    async create(feed: IFeed): Promise<IFeed> {
        const newFeed = new FeedModel(feed);
        return newFeed.save();
    }
    async bulkUpsert(feeds: IFeed[]): Promise<IBulkInsert> {
        const bulkOps: AnyBulkWriteOperation[] = feeds.map((feed) => ({
            updateOne: {
                filter: { newspaperId: feed.newspaperId, feedId: feed.feedId },
                update: { $setOnInsert: feed },
                upsert: true,
            },
        }));
        return FeedModel.bulkWrite(bulkOps);
    }

    async update(_id: string, feed: IFeed): Promise<IFeed | null> {
        return FeedModel.findOneAndUpdate({ _id }, feed, { new: true });
    }

    async getById(_id: string): Promise<IFeed | null> {
        return FeedModel.findById(_id);
    }

    async delete(_id: string): Promise<IFeed | null> {
        return FeedModel.findByIdAndDelete({ _id });
    }

    async findUnique(
        newspaperId: string,
        feedId: string
    ): Promise<IFeed | null> {
        return FeedModel.findOne({ newspaperId, feedId });
    }

    async retrieveFeedByDate(dateFrom: Date, dateTo: Date): Promise<IFeed[]> {
        dateTo.setHours(23, 59, 59, 999);
        return FeedModel.find({
            createdAt: { $gte: dateFrom, $lte: dateTo },
        });
    }
}
