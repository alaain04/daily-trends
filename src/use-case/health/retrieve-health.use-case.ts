import { Health } from '@src/domain/health/health.entities';
import UseCase from '../use-case';

export class GetAppHealthUseCase extends UseCase {
    protected healthMessage: string = 'Server up and running';

    async execute(): Promise<Health> {
        const health: Health = {
            message: this.healthMessage,
        };
        return Promise.resolve(health);
    }
}
