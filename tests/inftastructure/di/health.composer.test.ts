// HealthComposer.test.ts
import HealthComposer from '@src/infrastructure/di/health.composer';
import { AppHealthController } from '@src/presentation/rest/adapters/health/health.controllers';
import { GetAppHealthUseCase } from '@src/use-case/health/retrieve-health.use-case';

jest.mock('@src/presentation/rest/adapters/health/health.controllers');
jest.mock('@src/use-case/health/retrieve-health.use-case');

describe('HealthComposer', () => {
    let healthComposer: HealthComposer;

    beforeEach(() => {
        healthComposer = new HealthComposer();
    });

    it('should create an instance of AppHealthController', () => {
        expect(healthComposer.controller).toBeInstanceOf(AppHealthController);
    });
});
