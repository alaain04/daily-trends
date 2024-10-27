import { Health } from '@src/domain/health/health.entities';
import { AppHealthController } from '@src/presentation/rest/adapters/health/health.controllers';
import { GetAppHealthUseCase } from '@src/use-case/health/retrieve-health.use-case';
import { SuccessResponse } from '@src/presentation/rest/helpers/http-response';
import { Request, Response } from 'express';

class MockGetAppHealthUseCase extends GetAppHealthUseCase {
    protected healthMessage: string = 'message';
    execute(): Promise<Health> {
        throw new Error('Method not implemented.');
    }
}

jest.mock('@src/presentation/rest/helpers/http-response', () => ({
    SuccessResponse: jest.fn(),
}));

describe('Health Controller', () => {
    let appHealthController: AppHealthController;
    let mockGetAppHealthUseCase: GetAppHealthUseCase;

    beforeAll(() => {
        mockGetAppHealthUseCase = new MockGetAppHealthUseCase();
        appHealthController = new AppHealthController(mockGetAppHealthUseCase);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return health status', async () => {
        const mockHealth = { message: 'Server up and running' };
        jest.spyOn(mockGetAppHealthUseCase, 'execute').mockResolvedValue(
            mockHealth
        );
        const req: Partial<Request> = {};
        const res: Partial<Response> = {};
        await appHealthController.getHealth(req as Request, res as Response);

        expect(mockGetAppHealthUseCase.execute).toHaveBeenCalledTimes(1);
        expect(SuccessResponse).toHaveBeenCalledTimes(1);
        expect(SuccessResponse).toHaveBeenCalledWith(res, mockHealth);
    });
});
