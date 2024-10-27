import FeedComposer from '@src/infrastructure/di/feed.composer';
import FeedController from '@src/presentation/rest/adapters/feed/feed.controllers';
import FeedUseCase from '@src/use-case/feed.use-case';
import FeedRepository from '@src/infrastructure/repositories/feed.repository';
import ErrorHandler from '@src/infrastructure/helpers/error-handler';

jest.mock('@src/infrastructure/helpers/error-handler', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('@src/presentation/rest/adapters/feed/feed.controllers', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('@src/use-case/feed.use-case', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('@src/infrastructure/repositories/feed.repository', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('FeedComposer', () => {
    let feedComposer: FeedComposer;
    let mockRepository: jest.Mocked<FeedRepository>;
    let mockUseCase: jest.Mocked<FeedUseCase>;
    let mockController: jest.Mocked<FeedController>;

    beforeEach(() => {
        mockRepository = new FeedRepository() as jest.Mocked<FeedRepository>;
        mockUseCase = new FeedUseCase(
            mockRepository,
            new ErrorHandler()
        ) as jest.Mocked<FeedUseCase>;

        mockController = new FeedController(
            mockUseCase
        ) as jest.Mocked<FeedController>;

        feedComposer = new FeedComposer();
        feedComposer.controller = mockController;
    });

    it('should create an instance of FeedController', () => {
        expect(feedComposer.controller).toBeInstanceOf(FeedController);
    });
});
