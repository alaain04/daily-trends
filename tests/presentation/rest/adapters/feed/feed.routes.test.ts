import FeedController from '@src/presentation/rest/adapters/feed/feed.controllers';
import FeedRoutes from '@src/presentation/rest/adapters/feed/feed.routes';
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import FeedUseCase from '@src/use-case/feed.use-case';
import FeedRepositoryImpl from '@src/infrastructure/repositories/feed.repository';
import ErrorHandler from '@src/infrastructure/helpers/error-handler';
import { paramsValidator } from '@src/presentation/rest/middlewares/validate.middleware';

jest.mock('@src/infrastructure/repositories/feed.repository', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('@src/infrastructure/helpers/error-handler', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('@src/use-case/feed.use-case', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('@src/presentation/rest/adapters/feed/feed.controllers', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(
        jest.fn(function () {
            const controllerFn = (_req: Request, res: Response) => res.json();
            this.retrieveFeedsByDate = jest
                .fn()
                .mockImplementation(controllerFn);
            this.retrieveFeedById = jest.fn().mockImplementation(controllerFn);
            this.createFeed = jest.fn().mockImplementation(controllerFn);
            this.updateFeed = jest.fn().mockImplementation(controllerFn);
            this.deleteFeed = jest.fn().mockImplementation(controllerFn);
        })
    ),
}));
const middlewareMockFn = (req: Request, res: Response, next: NextFunction) =>
    next();
jest.mock('@src/presentation/rest/middlewares/validate.middleware', () => ({
    paramsValidator: () => middlewareMockFn,
    queryValidator: () => middlewareMockFn,
    bodyValidator: () => middlewareMockFn,
}));

describe('Feed routes', () => {
    let feedRoutes: FeedRoutes;
    let feedController: FeedController;
    let app: express.Application;
    let feedControllerMock: jest.Mock<FeedController>;
    let feedFunctionsMock: FeedController;
    const _id = '123567';

    beforeEach(() => {
        jest.clearAllMocks();
        feedController = new FeedController(
            new FeedUseCase(new FeedRepositoryImpl(), new ErrorHandler())
        );
        feedRoutes = new FeedRoutes(feedController);
        // Create server
        app = express();
        app.use('/api', feedRoutes.router);

        // Set mock variables
        feedControllerMock = FeedController as jest.Mock<FeedController>;
        feedFunctionsMock = feedControllerMock.mock.instances[0];

        feedControllerMock = FeedController as jest.Mock<FeedController>;
        feedFunctionsMock = feedControllerMock.mock.instances[0];
    });

    describe('GET /feeds/:id', () => {
        test('Should call get feed by id', async () => {
            // Execute
            await request(app).get(`/api/feeds/${_id}`);

            // Assert
            expect(feedFunctionsMock.retrieveFeedById).toHaveBeenCalledTimes(1);
        });

        test('Should call update feed', async () => {
            // Execute
            await request(app).put(`/api/feeds/${_id}`);

            // Assert
            expect(feedFunctionsMock.updateFeed).toHaveBeenCalledTimes(1);
        });

        test('Should call create feed', async () => {
            // Execute
            await request(app).post(`/api/feeds`);

            // Assert
            expect(feedFunctionsMock.createFeed).toHaveBeenCalledTimes(1);
        });

        test('Should call delete feed', async () => {
            // Execute
            await request(app).delete(`/api/feeds/${_id}`);

            // Assert
            expect(feedFunctionsMock.deleteFeed).toHaveBeenCalledTimes(1);
        });
    });
});
