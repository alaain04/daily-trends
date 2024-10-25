import { Health } from '@domain/health/health.entities';
import UseCase from '../use-case';

export class GetAppHealthUseCase extends UseCase {
    async execute(): Promise<Health> {
        const health: Health = {
            message: 'Server up and running',
        };
        return Promise.resolve(health);
    }
}
