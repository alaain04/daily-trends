import HealthComposer from '@src/infrastructure/di/health.composer';
import AppHealthController from '@src/presentation/rest/adapters/health/health.controllers';

jest.mock('@src/presentation/rest/adapters/health/health.controllers', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('@src/use-case/health.use-case', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('HealthComposer', () => {
    let healthComposer: HealthComposer;

    beforeEach(() => {
        healthComposer = new HealthComposer();
    });

    it('should create an instance of AppHealthController', () => {
        expect(healthComposer.controller).toBeInstanceOf(AppHealthController);
    });
});
