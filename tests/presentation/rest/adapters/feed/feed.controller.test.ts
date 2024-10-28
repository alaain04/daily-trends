import ErrorHandler from '@src/infrastructure/helpers/error-handler';
import FeedController from '@src/presentation/rest/adapters/feed/feed.controllers';
import { SuccessResponse } from '@src/presentation/rest/helpers/http-response';
import FeedUseCase from '@src/use-case/feed.use-case';
import { Request, Response } from 'express';
import { feed, LoggerMock, savedFeed } from '@tests/constants';
import FeedRepositoryImpl from '@src/infrastructure/database/repositories/feed.repository';
import NewspaperScraper from '@src/infrastructure/services/scraper/scraper-manager';

jest.mock('@src/infrastructure/services/scraper/scraper-manager', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockHealth = { message: 'example' };
const queryParams = {
    dateFrom: new Date().toISOString(),
    dateTo: new Date().toISOString(),
    page: '0',
    pageSize: '10',
};

jest.mock('@src/use-case/feed.use-case', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(
        jest.fn(function () {
            this.create = jest.fn().mockResolvedValue(mockHealth);
            this.update = jest.fn().mockResolvedValue(mockHealth);
            this.delete = jest.fn().mockResolvedValue(mockHealth);
            this.getById = jest.fn().mockResolvedValue(mockHealth);
            this.getByDates = jest.fn().mockResolvedValue(mockHealth);
        })
    ),
}));

jest.mock('@src/presentation/rest/helpers/http-response', () => ({
    SuccessResponse: jest.fn(),
}));

jest.mock('@src/infrastructure/database/repositories/feed.repository', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('@src/infrastructure/helpers/error-handler', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Feed Controller', () => {
    let feedController: FeedController;
    let feedUseCase: FeedUseCase;
    let res: Partial<Response>;
    let req: Partial<Request>;
    let feedUseCaseMock: jest.Mock<FeedUseCase>;
    let feedUseCaseFunctionsMock: FeedUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        feedUseCase = new FeedUseCase(
            new FeedRepositoryImpl(),
            new ErrorHandler(),
            new LoggerMock(),
            new NewspaperScraper()
        );
        feedController = new FeedController(feedUseCase);
        req = {
            body: feed,
            query: queryParams,
            params: { id: savedFeed._id },
        };
        res = {};
        feedUseCaseMock = FeedUseCase as jest.Mock<FeedUseCase>;

        feedUseCaseFunctionsMock = feedUseCaseMock.mock.instances[0];
    });

    test('should create a feed successfully', async () => {
        // Define
        const createUseCaseMock = feedUseCaseFunctionsMock.create;
        // Execute
        await feedController.createFeed(req as Request, res as Response);

        // Assert
        expect(createUseCaseMock).toHaveBeenCalledTimes(1);
        expect(createUseCaseMock).toHaveBeenCalledWith(feed);
        expect(SuccessResponse).toHaveBeenCalledTimes(1);
        expect(SuccessResponse).toHaveBeenCalledWith(res, mockHealth);
    });

    test('should update a feed successfully', async () => {
        // Define
        const updateUseCaseMock = feedUseCaseFunctionsMock.update;
        // Execute
        await feedController.updateFeed(req as Request, res as Response);

        // Assert
        expect(updateUseCaseMock).toHaveBeenCalledTimes(1);
        expect(updateUseCaseMock).toHaveBeenCalledWith(savedFeed._id, feed);
        expect(SuccessResponse).toHaveBeenCalledTimes(1);
        expect(SuccessResponse).toHaveBeenCalledWith(res, mockHealth);
    });

    test('should delete a feed successfully', async () => {
        // Define
        const deleteUseCaseMock = feedUseCaseFunctionsMock.delete;
        // Execute
        await feedController.deleteFeed(req as Request, res as Response);

        // Assert
        expect(deleteUseCaseMock).toHaveBeenCalledTimes(1);
        expect(deleteUseCaseMock).toHaveBeenCalledWith(savedFeed._id);
        expect(SuccessResponse).toHaveBeenCalledTimes(1);
        expect(SuccessResponse).toHaveBeenCalledWith(res, mockHealth);
    });

    test('should retrieve by id a feed successfully', async () => {
        // Define
        const getByIdUseCaseMock = feedUseCaseFunctionsMock.getById;
        // Execute
        await feedController.retrieveFeedById(req as Request, res as Response);

        // Assert
        expect(getByIdUseCaseMock).toHaveBeenCalledTimes(1);
        expect(getByIdUseCaseMock).toHaveBeenCalledWith(savedFeed._id);
        expect(SuccessResponse).toHaveBeenCalledTimes(1);
        expect(SuccessResponse).toHaveBeenCalledWith(res, mockHealth);
    });

    test('should retrieve feeds by date range successfully', async () => {
        // Define
        const getByDatesUseCaseMock = feedUseCaseFunctionsMock.getByDates;
        // Execute
        await feedController.retrieveFeedsByDate(
            req as Request,
            res as Response
        );

        // Assert
        expect(getByDatesUseCaseMock).toHaveBeenCalledTimes(1);
        expect(getByDatesUseCaseMock).toHaveBeenCalledWith(
            new Date(queryParams.dateFrom),
            new Date(queryParams.dateTo),
            Number(queryParams.page),
            Number(queryParams.pageSize)
        );
        expect(SuccessResponse).toHaveBeenCalledTimes(1);
        expect(SuccessResponse).toHaveBeenCalledWith(res, mockHealth);
    });
});
