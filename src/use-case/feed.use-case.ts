import { FeedRepository } from '@src/domain/feed/feed.interface';
import { Feed } from '@src/domain/feed/feed.entities';
import { ICrudUseCase } from './crud.use-case.interface';
import { IErrorHandler } from '@src/domain/common/error-handler';

export default class FeedUseCase implements ICrudUseCase<Feed> {
    constructor(
        private readonly feedRepository: FeedRepository,
        private readonly errorHandler: IErrorHandler
    ) {}

    async create(feed: Feed): Promise<Feed> {
        const saved = await this.feedRepository.findUnique(
            feed.newspaperId,
            feed.feedId
        );

        if (saved) {
            throw this.errorHandler.handleError(
                `FeedId: ${feed.feedId} already exists for this newspaperId: ${feed.newspaperId}.`
            );
        }
        return this.feedRepository.create(feed);
    }

    async update(_id: string, feed: Feed): Promise<Feed | null> {
        const saved = await this.feedRepository.getById(_id);
        if (!saved)
            throw this.errorHandler.handleError(`ID: ${_id} doesn't exist.`);

        const updated = await this.feedRepository.update(_id, feed);

        if (!updated)
            throw this.errorHandler.handleError(
                `ID: ${_id} couldn't be updated.`
            );

        return updated;
    }

    async delete(_id: string): Promise<Feed | null> {
        const saved = await this.feedRepository.getById(_id);
        if (!saved)
            throw this.errorHandler.handleError(`ID: ${_id} doesn't exist.`);

        const deleted = await this.feedRepository.delete(_id);
        if (!deleted)
            throw this.errorHandler.handleError(
                `ID: ${_id} couldn't be deleted.`
            );

        return deleted;
    }

    async getById(_id: string): Promise<Feed | null> {
        return this.feedRepository.getById(_id);
    }

    async getByDates(dateFrom: Date, dateTo: Date): Promise<Feed[]> {
        return this.feedRepository.retrieveFeedByDate(dateFrom, dateTo);
    }
}
