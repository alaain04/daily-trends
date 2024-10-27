import AppHealthController from '@src/presentation/rest/adapters/health/health.controllers';
import { SuccessResponse } from '@src/presentation/rest/helpers/http-response';
import { Request, Response } from 'express';
import AppHealthUseCase from '@src/use-case/health.use-case';

const mockHealth = { message: 'Server up and running' };
jest.mock('@src/use-case/health.use-case', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(
        jest.fn(function () {
            this.execute = jest.fn().mockResolvedValue(mockHealth);
        })
    ),
}));

jest.mock('@src/presentation/rest/helpers/http-response', () => ({
    SuccessResponse: jest.fn(),
}));

describe('Health Controller', () => {
    let appHealthController: AppHealthController;
    let getAppHealthUseCase: AppHealthUseCase;
    let res: Partial<Response>;
    let req: Partial<Request>;
    let appHealthUseCaseMock: jest.Mock<AppHealthUseCase>;
    let executeFunctionMock: Function;

    beforeEach(() => {
        jest.clearAllMocks();
        getAppHealthUseCase = new AppHealthUseCase();
        appHealthController = new AppHealthController(getAppHealthUseCase);
        req = {};
        res = {};
        appHealthUseCaseMock = AppHealthUseCase as jest.Mock<AppHealthUseCase>;
        executeFunctionMock = appHealthUseCaseMock.mock.instances[0].execute;
    });

    test('should return health status', async () => {
        // Execute
        await appHealthController.getHealth(req as Request, res as Response);

        // Assert
        expect(executeFunctionMock).toHaveBeenCalledTimes(1);
        expect(executeFunctionMock).toHaveBeenCalledWith();
        expect(SuccessResponse).toHaveBeenCalledTimes(1);
        expect(SuccessResponse).toHaveBeenCalledWith(res, mockHealth);
    });
});
