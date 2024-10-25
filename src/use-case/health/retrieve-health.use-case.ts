import { Health } from "@domain/health/health.entities";
import UseCase from "../use-case";
import { Logger } from "@domain/logger/logger.interface";

export class GetAppHealthUseCase extends UseCase {
  constructor(private readonly logger: Logger) {
    super();
  }

  async execute(): Promise<Health> {
    this.logger.info("Executing SomeUseCase");
    const health: Health = {
      message: "Server up and running",
    };
    return Promise.resolve(health);
  }
}
