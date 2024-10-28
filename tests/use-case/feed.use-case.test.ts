import { IFeedRepository } from '@src/domain/feed/feed.interface';
import ErrorHandler from '@src/infrastructure/helpers/error-handler';
import FeedRepositoryImpl from '@src/infrastructure/database/repositories/feed.repository';
import FeedUseCase from '@src/use-case/feed.use-case';
import { feed, LoggerMock, savedFeed } from '@tests/constants';
import NewspaperScraperManager from '@src/infrastructure/services/scraper/scraper-manager';

jest.mock('@src/infrastructure/services/scraper/scraper-manager', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(
        jest.fn(function () {
            this.executeScrapers = jest.fn().mockReturnValue({
                [Symbol.iterator]: function () {
                    let called = false;
                    return {
                        next: () => {
                            if (!called) {
                                called = true;
                                return { value: feed, done: false };
                            }
                            return { done: true };
                        },
                    };
                },
            });
        })
    ),
}));

const returnedError = 'Error thrown by error handler';

jest.mock('@src/infrastructure/database/repositories/feed.repository', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(
        jest.fn(function () {
            this.create = jest.fn().mockResolvedValue(savedFeed);
            this.update = jest.fn().mockResolvedValue(savedFeed);
            this.delete = jest.fn().mockResolvedValue(savedFeed);
            this.getById = jest.fn().mockResolvedValue(savedFeed);
            this.findUnique = jest.fn().mockResolvedValue(null);
            this.retrieveFeedByDate = jest.fn().mockResolvedValue([savedFeed]);
            this.bulkUpsert = jest.fn().mockResolvedValue({ upsertedIds: 0 });
        })
    ),
}));

jest.mock('@src/infrastructure/helpers/error-handler', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(
        jest.fn(function () {
            this.handleError = jest.fn().mockReturnValue(returnedError);
        })
    ),
}));

describe('Feed use case', () => {
    let feedUseCase: FeedUseCase;
    const feedRepositoryImplMock =
        FeedRepositoryImpl as jest.Mock<FeedRepositoryImpl>;
    const errorHandlerMock = ErrorHandler as jest.Mock<ErrorHandler>;
    const scraperServiceMock =
        NewspaperScraperManager as jest.Mock<NewspaperScraperManager>;
    let handleErrorMock: Function;
    let executeScraperMock: Function;
    let feedRepositoryMock: IFeedRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        feedUseCase = new FeedUseCase(
            new FeedRepositoryImpl(),
            new ErrorHandler(),
            new LoggerMock(),
            new NewspaperScraperManager()
        );
        handleErrorMock = errorHandlerMock.mock.instances[0].handleError;
        feedRepositoryMock = feedRepositoryImplMock.mock.instances[0];
        executeScraperMock =
            scraperServiceMock.mock.instances[0].executeScrapers;
    });

    test('should create a feed', async () => {
        // Define
        const findUniqueMock = feedRepositoryMock.findUnique;
        const createMock = feedRepositoryMock.create;

        // Execute
        const result = await feedUseCase.create(feed);

        // Assert
        expect(result).toEqual(savedFeed);
        expect(findUniqueMock).toHaveBeenCalledWith(
            feed.newspaperId,
            feed.feedId
        );
        expect(findUniqueMock).toHaveBeenCalledTimes(1);
        expect(createMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(0);
    });

    test('should fail the feed creation', async () => {
        // Override
        feedRepositoryMock.findUnique = jest.fn().mockResolvedValue(savedFeed);

        // Define
        const createMock = feedRepositoryMock.create;
        const findUniqueMock = feedRepositoryMock.findUnique;

        // Execute
        try {
            await feedUseCase.create(feed);
        } catch (error) {
            expect(error).toBe(returnedError);
        }

        // Assert
        expect(findUniqueMock).toHaveBeenCalledWith(
            feed.newspaperId,
            feed.feedId
        );
        expect(findUniqueMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(1);
        expect(createMock).toHaveBeenCalledTimes(0);
    });

    test('should update a feed', async () => {
        // Define
        const getByIdMock = feedRepositoryMock.getById;
        const updateMock = feedRepositoryMock.update;

        // Execute
        const result = await feedUseCase.update(savedFeed._id, feed);

        // Assert
        expect(result).toEqual(savedFeed);
        expect(getByIdMock).toHaveBeenCalledWith(savedFeed._id);
        expect(getByIdMock).toHaveBeenCalledTimes(1);
        expect(updateMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(0);
    });

    test('should fail the feed updating because feed._id does not exist', async () => {
        // Override
        feedRepositoryMock.getById = jest.fn().mockResolvedValue(null);

        // Define
        const updateMock = feedRepositoryMock.update;
        const getByIdMock = feedRepositoryMock.getById;

        // Execute
        try {
            await feedUseCase.update(savedFeed._id, feed);
        } catch (error) {
            expect(error).toBe(returnedError);
        }

        // Assert
        expect(getByIdMock).toHaveBeenCalledWith(savedFeed._id);
        expect(getByIdMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(1);
        expect(updateMock).toHaveBeenCalledTimes(0);
    });

    test('should fail the feed updating because update operation fails', async () => {
        // Override
        feedRepositoryMock.update = jest.fn().mockResolvedValue(null);

        // Define
        const updateMock = feedRepositoryMock.update;
        const getByIdMock = feedRepositoryMock.getById;

        // Execute
        try {
            await feedUseCase.update(savedFeed._id, feed);
        } catch (error) {
            expect(error).toBe(returnedError);
        }

        // Assert
        expect(getByIdMock).toHaveBeenCalledWith(savedFeed._id);
        expect(getByIdMock).toHaveBeenCalledTimes(1);
        expect(updateMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(1);
    });

    test('should delete a feed', async () => {
        // Define
        const getByIdMock = feedRepositoryMock.getById;
        const deleteMock = feedRepositoryMock.delete;

        // Execute
        const result = await feedUseCase.delete(savedFeed._id);

        // Assert
        expect(result).toEqual(savedFeed);
        expect(getByIdMock).toHaveBeenCalledWith(savedFeed._id);
        expect(getByIdMock).toHaveBeenCalledTimes(1);
        expect(deleteMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(0);
    });

    test('should fail the feed deleting because feed._id does not exist', async () => {
        // Override
        feedRepositoryMock.getById = jest.fn().mockResolvedValue(null);

        // Define
        const deleteMock = feedRepositoryMock.delete;
        const getByIdMock = feedRepositoryMock.getById;

        // Execute
        try {
            await feedUseCase.delete(savedFeed._id);
        } catch (error) {
            expect(error).toBe(returnedError);
        }

        // Assert
        expect(getByIdMock).toHaveBeenCalledWith(savedFeed._id);
        expect(getByIdMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(1);
        expect(deleteMock).toHaveBeenCalledTimes(0);
    });

    test('should fail the feed deleting because delete operation fails', async () => {
        // Override
        feedRepositoryMock.delete = jest.fn().mockResolvedValue(null);

        // Define
        const deleteMock = feedRepositoryMock.delete;
        const getByIdMock = feedRepositoryMock.getById;

        // Execute
        try {
            await feedUseCase.delete(savedFeed._id);
        } catch (error) {
            expect(error).toBe(returnedError);
        }

        // Assert
        expect(getByIdMock).toHaveBeenCalledWith(savedFeed._id);
        expect(getByIdMock).toHaveBeenCalledTimes(1);
        expect(deleteMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(1);
    });

    test('should find a feed by _id', async () => {
        // Define
        const getByIdMock = feedRepositoryMock.getById;

        // Execute
        const result = await feedUseCase.getById(savedFeed._id);

        // Assert
        expect(result).toEqual(savedFeed);
        expect(getByIdMock).toHaveBeenCalledWith(savedFeed._id);
        expect(getByIdMock).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(0);
    });

    test('should find a feed by dates range', async () => {
        // Define
        const retrieveFeedByDate = feedRepositoryMock.retrieveFeedByDate;
        const dateFrom = new Date();
        const dateTo = new Date();
        const page = 0;
        const pageSize = 10;
        // Execute
        const result = await feedUseCase.getByDates(
            dateFrom,
            dateTo,
            page,
            pageSize
        );

        // Assert
        expect(result).toEqual([savedFeed]);
        expect(retrieveFeedByDate).toHaveBeenCalledWith(
            dateFrom,
            dateTo,
            page,
            pageSize
        );
        expect(retrieveFeedByDate).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(0);
    });

    test('should start the scraping process', async () => {
        // Define
        const bulkUpsert = feedRepositoryMock.bulkUpsert;

        // Execute
        await feedUseCase.startScrapingProcess();

        // Assert
        expect(executeScraperMock).toHaveBeenCalledWith();
        expect(executeScraperMock).toHaveBeenCalledTimes(1);
        expect(bulkUpsert).toHaveBeenCalledWith(feed);
        expect(bulkUpsert).toHaveBeenCalledTimes(1);
        expect(handleErrorMock).toHaveBeenCalledTimes(0);
    });
});
