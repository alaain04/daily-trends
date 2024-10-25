import { HealthController } from '@presentation/rest/app/health/health.controllers';
import { GetAppHealthUseCase } from '@use-case/health/retrieve-health.use-case';

export default class HealthComposer {
    public readonly controller = new HealthController(
        new GetAppHealthUseCase()
    );
}
