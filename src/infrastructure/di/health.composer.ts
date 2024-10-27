import { AppHealthController } from '@src/presentation/rest/adapters/health/health.controllers';
import { GetAppHealthUseCase } from '@src/use-case/health/retrieve-health.use-case';

export default class HealthComposer {
    public readonly controller = new AppHealthController(
        new GetAppHealthUseCase()
    );
}
