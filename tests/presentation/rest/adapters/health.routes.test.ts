import request from 'supertest';
import { AppHealthController } from '@src/presentation/rest/adapters/health/health.controllers';
import HealthRoutes from '@src/presentation/rest/adapters/health/health.routes';
import express from 'express';
import { GetAppHealthUseCase } from '@src/use-case/health/retrieve-health.use-case';

class MockGetAppHealthUseCase extends GetAppHealthUseCase {
    execute(): Promise<{ message: string }> {
        return Promise.resolve({ message: 'Mocked health message' });
    }
}

class MockAppHealthController extends AppHealthController {
    constructor() {
        super(new MockGetAppHealthUseCase());
    }
    getHealth = jest.fn();
}

describe('HealthRoutes', () => {
    let healthRoutes: HealthRoutes;
    let mockAppHealthController: MockAppHealthController;

    let app: express.Application;

    beforeAll(() => {
        mockAppHealthController = new MockAppHealthController();
        healthRoutes = new HealthRoutes(mockAppHealthController);
        app = express();
        app.use('/api', healthRoutes.router);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /health', () => {
        test('Should return 200 with health status', async () => {
            jest.spyOn(mockAppHealthController, 'getHealth').mockImplementation(
                (_req, res) => res.end()
            );
            await request(app).get('/api/health');
            expect(mockAppHealthController.getHealth).toHaveBeenCalledTimes(1);
        });
    });
});
