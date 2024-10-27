import request from 'supertest';
import AppHealthController from '@src/presentation/rest/adapters/health/health.controllers';
import HealthRoutes from '@src/presentation/rest/adapters/health/health.routes';
import express from 'express';
import AppHealthUseCase from '@src/use-case/health.use-case';

jest.mock('@src/use-case/health.use-case');
jest.mock('@src/presentation/rest/adapters/health/health.controllers', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(
        jest.fn(function () {
            this.getHealth = jest.fn().mockImplementation((_req, res) => {
                res.end();
            });
        })
    ),
}));

describe('Health routes', () => {
    let healthRoutes: HealthRoutes;
    let appHealthController: AppHealthController;
    let app: express.Application;
    let healthControllerMock: jest.Mock<AppHealthController>;
    let getHealthMock: Function;

    beforeEach(() => {
        jest.clearAllMocks();
        appHealthController = new AppHealthController(new AppHealthUseCase());
        healthRoutes = new HealthRoutes(appHealthController);
        // Create server
        app = express();
        app.use('/api', healthRoutes.router);

        // Set mock variables
        healthControllerMock =
            AppHealthController as jest.Mock<AppHealthController>;
        getHealthMock = healthControllerMock.mock.instances[0].getHealth;
    });

    describe('GET /health', () => {
        test('Should return 200 with health status', async () => {
            // Execute
            await request(app).get('/api/health');

            // Assert
            expect(getHealthMock).toHaveBeenCalledTimes(1);
        });
    });
});
