import { IFeedRepository } from '@src/domain/feed/feed.interface';
import { IFeed } from '@src/domain/feed/feed.entities';
import { ICrudUseCase } from './crud.use-case.interface';
import { IErrorHandler } from '@src/domain/common/error-handler';
import { ILogger } from '@src/domain/common/logger.interface';
import { IScraperService } from '@src/domain/common/scraper-service';

export default class FeedUseCase implements ICrudUseCase<IFeed> {
    constructor(
        private readonly feedRepository: IFeedRepository,
        private readonly errorHandler: IErrorHandler,
        private readonly logger: ILogger,
        private readonly scraperService: IScraperService
    ) {}

    async create(feed: IFeed): Promise<IFeed> {
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

    async startScrapingProcess(): Promise<void> {
        const feedsGenerator = this.scraperService.executeScrapers();
        for await (const feeds of feedsGenerator) {
            const bulkResult = await this.feedRepository.bulkUpsert(feeds);
            this.logger.info(
                `Total Feeds: ${feeds.length} - Inserted: ${Object.keys(bulkResult.upsertedIds).length}`
            );
        }
    }

    async update(_id: string, feed: IFeed): Promise<IFeed | null> {
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

    async delete(_id: string): Promise<IFeed | null> {
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

    async getById(_id: string): Promise<IFeed | null> {
        return this.feedRepository.getById(_id);
    }

    async getByDates(
        dateFrom: Date,
        dateTo: Date,
        page: number,
        pageSize: number
    ): Promise<IFeed[]> {
        return this.feedRepository.retrieveFeedByDate(
            dateFrom,
            dateTo,
            page,
            pageSize
        );
    }
}
