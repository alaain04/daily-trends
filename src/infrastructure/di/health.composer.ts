import { HealthController } from "@presentation/rest/app/health/health.controllers";
import LOGGER from "@infrastructure/helpers/logger";
import { Logger } from "@domain/logger/logger.interface";
import { GetAppHealthUseCase } from "@use-case/health/retrieve-health.use-case";

export default class HealthComposer {
  private readonly logger: Logger = LOGGER;
  public readonly controller = new HealthController(
    new GetAppHealthUseCase(this.logger)
  );
}
