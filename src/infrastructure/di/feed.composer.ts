import FeedController from '@src/presentation/rest/adapters/feed/feed.controllers';
import FeedUseCase from '@src/use-case/feed.use-case';
import ErrorHandler from '@src/infrastructure/helpers/error-handler';
import Logger from '@src/infrastructure/helpers/logger';
import FeedRepositoryImpl from '@src/infrastructure/database/repositories/feed.repository';
import NewspaperScraperManager from '@src/infrastructure/services/scraper/scraper-manager';

export default class FeedComposer {
    private readonly repository: FeedRepositoryImpl = new FeedRepositoryImpl();
    private readonly logger = Logger;
    private readonly errorHandler: ErrorHandler = new ErrorHandler();
    private readonly scraperService: NewspaperScraperManager =
        new NewspaperScraperManager();
    private readonly useCase: FeedUseCase = new FeedUseCase(
        this.repository,
        this.errorHandler,
        this.logger,
        this.scraperService
    );
    public controller: FeedController = new FeedController(this.useCase);
}
