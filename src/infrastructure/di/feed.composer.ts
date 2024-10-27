import FeedController from '@src/presentation/rest/adapters/feed/feed.controllers';
import FeedUseCase from '@src/use-case/feed.use-case';
import FeedRepositoryImpl from '../repositories/feed.repository';
import ErrorHandler from '../helpers/error-handler';

export default class FeedComposer {
    private readonly repository: FeedRepositoryImpl = new FeedRepositoryImpl();
    private readonly errorHandler: ErrorHandler = new ErrorHandler();
    private readonly useCase: FeedUseCase = new FeedUseCase(
        this.repository,
        this.errorHandler
    );
    public controller: FeedController = new FeedController(this.useCase);
}
